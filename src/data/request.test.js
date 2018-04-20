import expect from 'expect';
import request from './request';
import problems from './problems';

it('get paginated data', () => {
  let result = request.getPaginatedData(problems);
  expect(result.count).toBe(problems.length);
  expect(result.results.length).toBe(10);
  expect(result.results[0].id).toBe(1);
  expect(result.results[9].id).toBe(10);
  expect(result.next).toBe(true);

  result = request.getPaginatedData(problems, { cursor: 24, limit: 10 });
  expect(result.count).toBe(problems.length);
  expect(result.results.length).toBe(1);
  expect(result.results[0].id).toBe(25);
  expect(result.next).toBe(false);
});

it('request paginated data', (done) => {
  let promise = request.requestPaginatedData(problems);
  const a = promise.then((result) => {
    expect(result.count).toBe(problems.length);
    expect(result.results.length).toBe(10);
    expect(result.results[0].id).toBe(1);
    expect(result.results[9].id).toBe(10);
    expect(result.next).toBe(true);
  });

  promise = request.requestPaginatedData(problems, { cursor: 24, limit: 10 });
  const b = promise.then((result) => {
    expect(result.count).toBe(problems.length);
    expect(result.results.length).toBe(1);
    expect(result.results[0].id).toBe(25);
    expect(result.next).toBe(false);
  });

  Promise.all([a, b]).then(() => {
    done();
  });
});
