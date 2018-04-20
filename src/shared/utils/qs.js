export function parseQueryString(query) {
  if (query[0] === '?') {
    query = query.slice(1);
  }
  const obj = {};
  const pairs = query.slice('&');
  for (let i = 0; i < pairs.length; i++) {
    const [key, value] = pairs[i].split('=');
    obj[key] = decodeURIComponent(value);
  }
  return obj;
}
