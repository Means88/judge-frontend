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
    if (!this.storedProperties) {
      return '{}';
    }
    const result = {};
    for (let i = 0; i < this.storedProperties.length; i++) {
      const key = this.storedProperties[i];
      result[key] = this[key];
    }
    return JSON.stringify(result);
  }

  fromString(str) {
    let obj;
    try {
      obj = JSON.parse(str);
    } catch (e) {
      obj = {};
    }

    for (const key in obj) {
      if (this.storedProperties.indexOf(key) === -1) {
        continue;
      }
      this[key] = obj[key];
    }
  }
}
