import { observable, action } from 'mobx';
import BaseStore from './BaseStore';
import provider from '../data/provider';
import { Cancelable } from './utils';

class ProblemStore extends BaseStore {
  storedProperties = ['problems'];
  @observable problems = {};
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
    if (!navigator.onLine) {
      if (!this.problems[id]) {
        return Promise.reject();
      }
      this.problem = this.problems[id];
      return Promise.resolve();
    }

    this.loadingId = id;
    this.lastRequest = Cancelable(provider.getProblem(id));
    return this.lastRequest.then(result => result.data).then((problem) => {
      this.problem = problem;
      this.loadingId = null;
      this.lastRequest = null;
      this.problems[problem.id] = problem;
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
