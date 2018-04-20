import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { withRouter } from 'react-router-dom';
import debounce from 'lodash/debounce';
import Header from '../shared/components/Header';
import Loading from '../shared/components/Loading';
import List from './components/List';
import ListStore from '../store/ListStore';
import ProblemStore from '../store/ProblemStore';
import './index.less';

@withRouter
@observer
class ListPage extends Component {
  componentDidMount() {
    ListStore.loadMore();
    window.addEventListener('scroll', this.onScroll);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.onScroll);
  }

  gotoDetail = (id) => {
    ProblemStore.retrieve(id).then(() => {
      this.props.history.push(`/problem/${id}/`);
    }).catch(() => {/* pass */})
  };

  onScroll = debounce(() => {
    if (document.body.scrollHeight - window.innerHeight - window.scrollY >= 120) {
      return;
    }
    if (ListStore.loading) {
      return;
    }
    if (!ListStore.hasNext) {
      return;
    }
    ListStore.loadMore();
  }, 100);

  render() {
    return (
      <div className="with-fixed-header">
        <Header />
        <div className="content container">
          <List
            problems={ListStore.list.peek()}
            onItemClick={this.gotoDetail}
            loadingId={ProblemStore.loadingId}
          />
          {ListStore.loading && <Loading style={{ margin: '15px 0' }} />}
        </div>
      </div>
    );
  }
}

export default ListPage;
