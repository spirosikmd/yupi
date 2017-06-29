const fs = require('fs');
const getTokenDir = require('./getTokenDir');
const getTokenPath = require('./getTokenPath');

/**
 * Store token to disk be used in later program executions.
 *
 * @param {Object} token The token to store to disk.
 */
function storeToken(token) {
  const tokenDir = getTokenDir();
  try {
    fs.mkdirSync(tokenDir);
  } catch (err) {
    if (err.code !== 'EEXIST') {
      throw err;
    }
  }
  const tokenPath = getTokenPath();
  fs.writeFile(tokenPath, JSON.stringify(token));
  console.log('Token stored to ' + tokenPath);
}

module.exports = storeToken;
