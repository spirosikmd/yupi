const fs = require('fs');

/**
 * Load client secrets from a local file.
 * @return {Promise}
 */
function loadClientSecrets() {
  return new Promise((resolve, reject) => {
    fs.readFile('client_secret.json', function processClientSecrets(
      err,
      content
    ) {
      if (err) {
        console.log('Error loading client secret file: ' + err);
        reject(err);
        return;
      }
      resolve(JSON.parse(content));
    });
  });
}

module.exports = loadClientSecrets;
