import React from 'react';
import { shallow } from 'enzyme';
import { BrowserRouter } from 'react-router-dom';
import Problem from './index';

it('renders without crashing', () => {
  const component = shallow(
    <BrowserRouter>
      <Problem />
    </BrowserRouter>
  );
});
