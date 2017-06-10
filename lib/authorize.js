const fs = require('fs');
const googleAuth = require('google-auth-library');
const getNewToken = require('./getNewToken');
const getTokenPath = require('./getTokenPath');

function authorize(credentials) {
  const clientSecret = credentials.installed.client_secret;
  const clientId = credentials.installed.client_id;
  const redirectUrl = credentials.installed.redirect_uris[0];
  const auth = new googleAuth();
  const oauth2Client = new auth.OAuth2(clientId, clientSecret, redirectUrl);
  const tokenPath = getTokenPath();

  return new Promise((resolve, reject) => {
    fs.readFile(tokenPath, function(err, token) {
      if (err) {
        getNewToken(oauth2Client, resolve, reject);
      } else {
        oauth2Client.credentials = JSON.parse(token);
        resolve(oauth2Client);
      }
    });
  });
}

module.exports = authorize;
