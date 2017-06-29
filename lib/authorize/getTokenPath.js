const getTokenDir = require('./getTokenDir');

function getTokenPath() {
  return getTokenDir() + 'calendar-nodejs-yupi.json';
}

module.exports = getTokenPath;
