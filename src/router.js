import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import List from './list';
import Problem from './problem';

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={List} />
        <Route path="/problem/:id/" exact component={Problem} />
      </Switch>
    </BrowserRouter>
  );
}
