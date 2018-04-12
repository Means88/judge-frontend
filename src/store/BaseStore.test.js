import expect from 'expect';
import BaseStore from './BaseStore';

window.localStorage = new Proxy({}, {
  set: function (target, key, value) {
    target[key] = value.toString();
    return value;
  }
});

class TestStore extends BaseStore {
  data = 0;
}


it('test base store', () => {
  let t = new TestStore();
  t.data = 1;
  t.commit();
  expect(localStorage[t.storageKey()]).toBe('{"data":1}');
  t = new TestStore();
  t.restore();
  expect(t.data).toBe(1);
  t.data = 2;
  t.apply();
  expect(localStorage[t.storageKey()]).toBe('{"data":2}');
});
