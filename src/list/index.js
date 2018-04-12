import React, { Component } from 'react';
import { observer } from 'mobx-react';
import debounce from 'lodash/debounce';
import Header from '../shared/components/Header';
import Loading from '../shared/components/Loading';
import List from './components/List';
import ListStore from '../store/ListStore';
import './index.less';

@observer
class App extends Component {
  componentDidMount() {
    ListStore.loadMore();
    window.addEventListener('scroll', this.onScroll);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.onScroll);
  }

  onScroll = debounce(() => {
    if (document.body.scrollHeight - window.innerHeight - window.scrollY >= 120) {
      return;
    }
    if (!ListStore.hasNext) {
      return;
    }
    ListStore.loadMore();
  }, 100);

  render() {
    return (
      <div className="App with-fixed-header">
        <Header />
        <div className="content container">
          <List problems={ListStore.list.peek()} />
          {ListStore.loading && <Loading style={{ margin: '15px 0' }} />}
        </div>
      </div>
    );
  }
}

export default App;
