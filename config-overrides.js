const { compose } = require('react-app-rewired');
const rewireMobX = require('react-app-rewire-mobx');
const rewireLess = require('react-app-rewire-less');

module.exports = compose(
  rewireLess,
  rewireMobX
);
