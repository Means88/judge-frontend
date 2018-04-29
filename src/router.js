import React from 'react';
import { BrowserRouter, Route, Switch, withRouter } from 'react-router-dom';
import List from './list';
import Problem from './problem';
import Submission from './submission';

@withRouter
class GlobalHook extends React.Component {
  componentWillReceiveProps(nextProps) {
    if (this.props.location.pathname !== nextProps.location.pathname) {
      window.scrollTo(0, 0);
    }
  }

  render() {
    return this.props.children;
  }
}

export default function AppRouter() {
  return (
    <BrowserRouter>
      <GlobalHook>
        <Switch>
          <Route path="/" exact component={List} />
          <Route path="/problem/:id/" exact component={Problem} />
          <Route path="/submission" exact component={Submission} />
        </Switch>
      </GlobalHook>
    </BrowserRouter>
  );
}
