const readline = require('readline');
const storeToken = require('./storeToken');

const SCOPES = [
  'https://www.googleapis.com/auth/plus.me',
  'https://www.googleapis.com/auth/calendar'
];

function getNewToken(oauth2Client, resolve, reject) {
  const authUrl = oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPES
  });
  console.log('Authorize this app by visiting this url: ', authUrl);
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  rl.question('Enter the code from that page here: ', function(code) {
    rl.close();
    oauth2Client.getToken(code, function(err, token) {
      if (err) {
        console.log('Error while trying to retrieve access token', err);
        reject(err);
        return;
      }
      oauth2Client.credentials = token;
      storeToken(token);
      resolve(oauth2Client);
    });
  });
}

module.exports = getNewToken;
