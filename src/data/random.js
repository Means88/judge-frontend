export default {
  randint(arg0, arg1) {
    let min = arg0;
    let max = arg1;
    if (typeof arg1 === 'undefined') {
      min = 0;
      max = arg0;
    }
    return Math.floor((max - min) * Math.random() + min);
  },
  choice(arr) {
    if (!arr.length) {
      throw new Error('It doesn\'t have property "length"');
    }
    const index = Math.floor(Math.random() * arr.length);
    return arr[index];
  }
}
