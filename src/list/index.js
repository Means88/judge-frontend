import React, { Component } from 'react';
import Header from '../shared/components/Header';
import List from './components/List';
import problems from '../data/problems';
import './index.less';

class App extends Component {
  render() {
    return (
      <div className="App with-fixed-header">
        <Header />
        <div className="content container">
          <List problems={problems} />
        </div>
      </div>
    );
  }
}

export default App;
