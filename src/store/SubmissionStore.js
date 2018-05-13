import { observable, action, computed } from 'mobx';
import provider from '../data/provider';

class SubmissionStore {
  @observable list = [];
  @observable loading = false;
  @observable nextUrl = null;

  @action initial(problemId) {
    this.problemId = problemId;
    this.list = [];
    this.loading = false;
    this.nextUrl = `/api/submission/?problem=${problemId}`;
    this.loadMore();
  }

  @action loadMore() {
    if (this.nextUrl === null) {
      return Promise.resolve();
    }

    this.loading = true;
    return provider.get(this.nextUrl).then(({ data }) => {
      const submissions = data.results;
      this.list = this.list.concat(submissions);
      this.nextUrl = data.next && data.next.replace(/https?:\/\/[^/]*/, '');
      this.loading = false;
    });
  }
}

export default new SubmissionStore();

