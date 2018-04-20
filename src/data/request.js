function delay(value, time) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(value);
    }, time);
  });
}

function delayApply(func, args, time = 750) {
  const result = func.apply(this, args);
  return delay(result, time);
}

const handler = {
  get: function (target, name) {
    if (target[name] !== undefined || name.indexOf('request') !== 0) {
      return target[name];
    }
    const funcName = name.replace(/^request/, 'get');
    const f = target[funcName];
    if (typeof f !== 'function') {
      return undefined;
    }
    target[name] = function () {
      return delayApply(f, arguments);
    };
    return target[name];
  }
};

const filter = fields => obj => {
  if (fields === null) {
    return Object.assign({}, obj);
  }
  const result = {};
  for (let i = 0; i < fields.length; i++) {
    const key = fields[i];
    result[key] = obj[key];
  }
  return result;
};

const getter = {
  getPaginatedData(list, options) {
    const { cursor, limit, reversed, fields } = Object.assign({
      cursor: 0,
      limit: 10,
      reversed: false,
      fields: null,
    }, options);

    function cmp(a, b) {
      if (reversed) {
        return a >= b;
      }
      return a <= b;
    }

    const results = [];
    let i = 0;
    while (list[i] && cmp(list[i].id, cursor)) {
      i++;
    }
    let j = i;
    while (j - i < limit && list[j]) {
      results.push(list[j]);
      j++;
    }
    const data = {
      count: list.length,
      results: results.map(filter(fields)),
      next: !!list[j],
      first: list[0].id,
      last: list[list.length - 1].id,
    };
    return JSON.parse(JSON.stringify(data));
  },
  getObject(list, id) {
    const data = list.find(i => i.id === id);
    return JSON.parse(JSON.stringify(data));
  }
};

export default new Proxy(getter, handler);
