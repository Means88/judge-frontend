import { observable, action } from 'mobx';
import problems from '../data/problems';
import provider from '../data/request';
import { Cancelable } from './utils';

class ProblemStore {
  @observable problem = null;
  @observable loadingId = null;
  @observable lastRequest = null;
  CancelSymbol = 'Symbol(Cancel)';

  @action retrieve(id) {
    if (id === this.loadingId) {
      return Promise.reject();
    }
    if (this.lastRequest) {
      this.lastRequest.cancel(this.CancelSymbol);
    }
    this.loadingId = id;
    this.lastRequest = Cancelable(provider.requestObject(problems, id));
    return this.lastRequest.then((problem) => {
      this.problem = problem;
      this.loadingId = null;
      this.lastRequest = null;
    }).catch((e) => {
      if (e !== this.CancelSymbol) {
        this.loadingId = null;
        this.lastRequest = null;
      }
      throw e;
    });
  }

  @action reset() {
    this.problem = null;
  }
}

export default new ProblemStore();
