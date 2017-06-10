const fs = require('fs');
const readline = require('readline');
const google = require('googleapis');
const calendar = google.calendar('v3');
const plus = google.plus('v1');
const googleAuth = require('google-auth-library');
const dateFormat = require('dateformat');
const chrono = require('chrono-node');

const SCOPES = [
  'https://www.googleapis.com/auth/plus.me',
  'https://www.googleapis.com/auth/calendar'
];
const TOKEN_DIR =
  (process.env.HOME || process.env.HOMEPATH || process.env.USERPROFILE) +
  '/.credentials/';
const TOKEN_PATH = TOKEN_DIR + 'calendar-nodejs-work-from-home.json';

function workFromHome(givenDate) {
  if (!givenDate) {
    console.log('Please give a date 🙈');
    process.exit(1);
  }

  const parsedDate = chrono.parseDate(givenDate);

  if (!parsedDate) {
    console.log('Given date is not valid 😱');
    process.exit(1);
  }

  const formattedDate = dateFormat(new Date(parsedDate), 'isoDate');

  loadClientSecrets().then(secrets => {
    // Authorize a client with the loaded credentials, then call the
    // Google Calendar API.
    authorize(secrets, auth => {
      createWorkFromHomeEventWithAuth(auth, formattedDate);
    });
  });
}

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

/**
 * Create an OAuth2 client with the given credentials, and then execute the
 * given callback function.
 *
 * @param {Object} credentials The authorization client credentials.
 * @param {function} callback The callback to call with the authorized client.
 */
function authorize(credentials, callback) {
  const clientSecret = credentials.installed.client_secret;
  const clientId = credentials.installed.client_id;
  const redirectUrl = credentials.installed.redirect_uris[0];
  const auth = new googleAuth();
  const oauth2Client = new auth.OAuth2(clientId, clientSecret, redirectUrl);

  // Check if we have previously stored a token.
  fs.readFile(TOKEN_PATH, function(err, token) {
    if (err) {
      getNewToken(oauth2Client, callback);
    } else {
      oauth2Client.credentials = JSON.parse(token);
      callback(oauth2Client);
    }
  });
}

/**
 * Get and store new token after prompting for user authorization, and then
 * execute the given callback with the authorized OAuth2 client.
 *
 * @param {google.auth.OAuth2} oauth2Client The OAuth2 client to get token for.
 * @param {function} callback The callback to call with the authorized client.
 */
function getNewToken(oauth2Client, callback) {
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
        return;
      }
      oauth2Client.credentials = token;
      storeToken(token);
      callback(oauth2Client);
    });
  });
}

/**
 * Store token to disk be used in later program executions.
 *
 * @param {Object} token The token to store to disk.
 */
function storeToken(token) {
  try {
    fs.mkdirSync(TOKEN_DIR);
  } catch (err) {
    if (err.code !== 'EEXIST') {
      throw err;
    }
  }
  fs.writeFile(TOKEN_PATH, JSON.stringify(token));
  console.log('Token stored to ' + TOKEN_PATH);
}

function getEventData(givenName, date) {
  return {
    summary: `Work From Home - ${givenName}`,
    description: `${givenName} is working from home.`,
    start: {
      date
    },
    end: {
      date
    },
    reminders: {
      useDefault: true
    }
  };
}

function getAuthenticatedPerson(auth) {
  return new Promise((resolve, reject) => {
    plus.people.get(
      {
        userId: 'me',
        auth: auth
      },
      function(err, response) {
        if (err) {
          console.log('There was an error contacting the Plus service: ' + err);
          reject(err);
          return;
        }
        resolve(response);
      }
    );
  });
}

function getNameFromAuthenticatedPerson(authenticatedPerson) {
  const { name: { givenName } } = authenticatedPerson;
  return givenName;
}

function createEvent(auth, event) {
  return new Promise((resolve, reject) => {
    calendar.events.insert(
      {
        auth: auth,
        calendarId: 'primary',
        resource: event
      },
      function(err, event) {
        if (err) {
          console.log(
            'There was an error contacting the Calendar service: ' + err
          );
          reject(err);
          return;
        }
        console.log('Event created: %s\nHave a nice day! ☀️', event.htmlLink);
        resolve(event);
      }
    );
  });
}

function createWorkFromHomeEventWithAuth(auth, formattedDate) {
  getAuthenticatedPerson(auth)
    .then(getNameFromAuthenticatedPerson)
    .then(givenName => getEventData(givenName, formattedDate))
    .then(eventData => createEvent(auth, eventData));
}

module.exports = workFromHome;
