import expect from 'expect';
import React from 'react';
import { render } from 'enzyme';
import { BrowserRouter } from 'react-router-dom';
import List from './List';
import { SUBMISSION_STATUS } from "../../shared/constants";

it('renders without crashing', () => {
  const problems = [{
    id: 1,
    title: 'A+B Problem',
    description: 'Write a function that add two numbers A and B.',
    status: SUBMISSION_STATUS.AC,
    picture: 'https://avatars1.githubusercontent.com/u/5810331?s=460&v=4',
    input: '输入为一行，包含两个整数A，B。数据保证A与B都在2^31-1的范围内',
    output: '输入A与B的和，数据保证A与B的和在2^31-1的范围内',
    sampleInput: '1 3',
    sampleOutput: '4',
    hint: '...',
  }, {
    id: 2,
    title: 'Trailing Zeros',
    description: 'Write an algorithm which computes the number of trailing zeros in n factorial.',
    status: SUBMISSION_STATUS.WA,
    picture: '/img/thumb76_76.png',
  }];
  const component = render(
    <BrowserRouter>
      <List
        problems={problems}
      />
    </BrowserRouter>
  );

  expect(component.find('.problem-list-item').length).toEqual(2);
  expect(component.find('.problem-list-item:first-child').find('.status span').text()).toEqual('AC');
});
