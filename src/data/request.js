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

const getter = {
  getPaginatedData(list, cursor = 0, limit = 10) {
    const results = [];
    let i = 0;
    while (list[i] && list[i].id <= cursor) {
      i++;
    }
    let j = i;
    while (j - i < limit && list[j]) {
      results.push(list[j]);
      j++;
    }
    const data = {
      count: list.length,
      results: results.map(result => ({
        id: result.id,
        title: result.title,
        status: result.status,
        picture: result.picture,
        description: result.description,
      })),
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
