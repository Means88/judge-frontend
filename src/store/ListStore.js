import { observable, action } from 'mobx';
import BaseStore from './BaseStore';
import provider from '../data/provider';
import { refreshList } from './utils';

class ListStore extends BaseStore {
  storedProperties = ['list'];
  @observable list = [];
  @observable loading = false;
  @observable hasNext = true;
  cursor = 0;

  refreshCursor = 0;
  refreshMax = 0;

  constructor() {
    super();
    this.restore();
    if (this.list.length === 0) {
      return;
    }
    const lastItem = this.list[this.list.length - 1];
    this.cursor = this.refreshMax = lastItem.id;
    this.refreshCursor = 0;
    this.refreshStoredList();
  }

  @action refreshStoredList() {
    if (this.refreshCursor >= this.refreshMax) {
      this.apply();
      return;
    }
    provider.getProblemList(this.refreshCursor).then(result => result.data).then((data) => {
      const problems = data.results;
      this.list = refreshList(this.list, problems, {
        first: data.first,
        last: data.last,
      });
      if (problems.length) {
        this.refreshCursor = problems[problems.length - 1].id;
      }
      this.refreshStoredList();
    });
  }

  @action loadMore() {
    if (!this.hasNext) {
      return Promise.resolve();
    }

    this.loading = true;
    return provider.getProblemList(this.cursor).then(result => result.data).then((data) => {
      const problems = data.results;
      this.list = refreshList(this.list, problems, {
        first: data.first,
        last: data.last,
      });
      if (problems.length) {
        this.cursor = problems[problems.length - 1].id;
      }
      this.hasNext = data.next;
      this.loading = false;
      this.apply();
    });
  }

}

export default new ListStore();
