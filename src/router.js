import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import List from './list';

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={List} />
      </Switch>
    </BrowserRouter>
  );
}
