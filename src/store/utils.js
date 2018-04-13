export function refreshList(target, source, options = {}) {
  const { lookup, first, last } = Object.assign({
    lookup: 'id',
    first: null,
    last: null,
  }, options);

  if (first !== null) {
    target = target.filter(i => i[lookup] >= first);
  }
  if (last !== null) {
    target = target.filter(i => i[lookup] <= last);
  }
  if (target.length === 0) {
    return source;
  }
  if (source.length === 0) {
    return target;
  }

  const result = [];
  let i = 0;
  let j = 0;
  while (i < target.length && target[i][lookup] < source[j][lookup]) {
    result.push(target[i++]);
  }
  while (i < target.length && j < source.length) {
    if (target[i][lookup] === source[j][lookup]) {
      result.push(source[j]);
      i++; j++;
    } else if (target[i][lookup] > source[j][lookup]) {
      result.push(source[j++]);
    } else {
      // deleted in new source
      i++;
    }
  }
  while (i < target.length) {
    result.push(target[i++]);
  }
  while (j < source.length) {
    result.push(source[j++]);
  }
  return result;
}

export function Cancelable(promise) {
  let _reject = null;
  const result = Promise.race([promise, new Promise((_, reject) => {
    _reject = reject;
  })]);
  result.cancel = _reject.bind(null);
  return result;
}
