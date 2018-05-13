import React from 'react';
import { observer } from 'mobx-react';
import { withRouter } from 'react-router-dom';
import debounce from 'lodash/debounce';
import Header from '../shared/components/Header';
import Loading from '../shared/components/Loading';
import List from './components/List';
import SubmissionStore from '../store/SubmissionStore';
import { parseQueryString } from '../shared/utils/qs';
import './index.less';

@withRouter
@observer
export default class Submission extends React.Component {
  componentDidMount() {
    this.initialSubmissions(this.props);
    window.addEventListener('scroll', this.loadMore);
  }

  componentWillReceiveProps(nextProps) {
    this.initialSubmissions(nextProps);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.loadMore);
  }

  loadMore = debounce(() => {
    if (document.body.scrollHeight - window.innerHeight - window.scrollY >= 120) {
      return;
    }
    if (SubmissionStore.loading) {
      return;
    }
    if (SubmissionStore.nextUrl === null) {
      return;
    }
    SubmissionStore.loadMore();
  }, 100);

  initialSubmissions(props) {
    const query = parseQueryString(props.location.search);
    const problemId = query.problem;
    SubmissionStore.initial(problemId);
  }

  render() {
    return (
      <div className="with-fixed-header">
        <Header />
        <div className="container">
          <List submissions={SubmissionStore.list.peek()} />
        </div>
        {SubmissionStore.loading && <Loading style={{ margin: '15px 0' }} />}
      </div>
    );
  }
}
