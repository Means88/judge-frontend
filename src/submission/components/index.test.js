import React from 'react';
import { shallow } from 'enzyme';
import { BrowserRouter } from 'react-router-dom';
import List from './list';

it('renders without crashing', () => {
  const component = shallow(
    <BrowserRouter>
      <List />
    </BrowserRouter>
  );
});
