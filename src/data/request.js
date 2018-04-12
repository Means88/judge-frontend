function delay(value, time) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(value);
    }, time);
  });
}

function delayApply(func, args, time = 500) {
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
    return {
      count: list.length,
      results,
      next: !!list[j],
    }
  }
};

export default new Proxy(getter, handler);
