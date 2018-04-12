import expect from 'expect';
import { refreshList } from './utils';


it('refreshList', () => {
  let a = [1, 3, 4].map(i => ({ id: i, value: 'old' }));
  let b = [1, 2, 3].map(i => ({ id: i, value: 'new' }));
  let result = refreshList(a, b);
  expect(result.length).toBe(4);
  expect(result[0].id).toBe(1);
  expect(result[0].value).toBe('new');
  expect(result[3].value).toBe('old');

  a = [1, 2, 3, 5, 6, 7].map(i => ({ id: i, value: 'old' }));
  b = [2, 5, 6, 8].map(i => ({ id: i, value: 'new' }));
  result = refreshList(a, b);
  expect(result.length).toBe(5);
  let expectedIds = [1, 2, 5, 6, 8];
  let expectedValues = ['old', 'new', 'new', 'new', 'new'];
  for (let i = 0; i < 5; i++) {
    expect(result[i].id).toBe(expectedIds[i]);
    expect(result[i].value).toBe(expectedValues[i]);
  }

  a = [1, 2, 3, 5, 6, 7].map(i => ({ id: i, value: 'old' }));
  b = [2, 5, 6, 8].map(i => ({ id: i, value: 'new' }));
  result = refreshList(a, b, { first: 2, last: 8 });
  expect(result.length).toBe(4);
  expectedIds = [2, 5, 6, 8];
  expectedValues = ['new', 'new', 'new', 'new'];
  for (let i = 0; i < 4; i++) {
    expect(result[i].id).toBe(expectedIds[i]);
    expect(result[i].value).toBe(expectedValues[i]);
  }
});
