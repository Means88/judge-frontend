export default class BaseStore {
  _applyCallback = {};
  _writeId = 1;
  _lastWrittenId = 0;

  storageKey() {
    return `__storage_${this.constructor.name}`;
  }

  restore() {
    if (typeof localStorage === 'undefined') {
      return;
    }
    this.fromString(localStorage[this.storageKey()]);
  }

  commit() {
    if (typeof localStorage === 'undefined') {
      return;
    }
    this._lastWrittenId = this._writeId++;
    localStorage[this.storageKey()] = this.toString();
    for (const writeId in this._applyCallback) {
      if (writeId <= this._lastWrittenId) {
        delete this._applyCallback[writeId];
      }
    }
  }

  apply() {
    if (typeof localStorage === 'undefined') {
      return;
    }
    if (typeof requestIdleCallback === 'undefined') {
      this.commit();
      return;
    }
    const _writeId = this._writeId++;
    const idleId = requestIdleCallback(() => {
      if (this._lastWrittenId >= _writeId) {
        return;
      }
      this.commit();
    });
    this._applyCallback[_writeId] = idleId;
  }

  toString() {
    return JSON.stringify(this, (k, v) => {
      if (k[0] === '_') {
        return undefined;
      }
      return v;
    });
  }

  fromString(str) {
    const obj = JSON.parse(str);
    for (const key in obj) {
      this[key] = obj[key];
    }
  }
}
