import React, { Component } from 'react';
import Header from '../shared/components/Header';
import List from './components/List';
import './index.less';

class App extends Component {
  render() {
    return (
      <div className="App with-fixed-header">
        <Header />
        <div className="content container">
          <List />
        </div>
        <p className="App-intro" style={{ height: 800 }}>
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;
