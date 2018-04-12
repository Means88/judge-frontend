import expect from 'expect';
import { observable } from 'mobx';
import BaseStore from './BaseStore';

window.localStorage = new Proxy({}, {
  set: function (target, key, value) {
    target[key] = String(value);
    return true;
  }
});

class TestStore extends BaseStore {
  storedProperties = ['data'];
  data = 0;
}


it('test store', () => {
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


class MobXStore extends BaseStore {
  storedProperties = ['obj', 'arr'];
  @observable obj = {
    a: 1,
  };
  @observable arr = [{
    a: 1,
  }];
}

it('MobX store', () => {
  let t = new MobXStore();
  expect(t.toString()).toBe('{"obj":{"a":1},"arr":[{"a":1}]}');
});
