const getTokenDir = require('./getTokenDir');

function getTokenPath() {
  return getTokenDir() + 'calendar-nodejs-work-from-home.json';
}

module.exports = getTokenPath;
