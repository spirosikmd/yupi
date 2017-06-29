const google = require('googleapis');
const plus = google.plus('v1');

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

function getAuthenticatedPersonName(auth) {
  return getAuthenticatedPerson(auth).then(authenticatedPerson => ({
    name: getNameFromAuthenticatedPerson(authenticatedPerson)
  }));
}

module.exports = getAuthenticatedPersonName;
