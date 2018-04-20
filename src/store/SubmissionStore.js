import { observable, action, computed } from 'mobx';
import provider from '../data/request';
import { generateSubmissions } from '../data/submissions';

let submissions = generateSubmissions({ count: 35 });
const fields = ['id', 'user', 'problem', 'status', 'time_cost', 'memory_cost'];

class SubmissionStore {
  @observable list = [];
  @observable loading = false;
  @observable hasNext = true;

  @action initial(problemId) {
    submissions = generateSubmissions({ count: 35, problemId });
    this.list = [];
    this.loading = false;
    this.hasNext = true;
    this.loadMore();
  }

  @action loadMore() {
    if (!this.hasNext) {
      return Promise.resolve();
    }

    this.loading = true;
    return provider.requestPaginatedData(submissions, { cursor: this.cursor, reversed: true, fields }).then((data) => {
      const submissions = data.results;
      this.list = this.list.concat(submissions);
      this.hasNext = data.next;
      this.loading = false;
    });
  }

  @computed get cursor() {
    if (this.list.length === 0) {
      return Infinity;
    }
    return this.list[this.list.length - 1].id;
  }
}

export default new SubmissionStore();

