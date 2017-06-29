const google = require('googleapis');
const calendar = google.calendar('v3');
const plus = google.plus('v1');

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

function createEventWithAuth(auth, formattedDate) {
  getAuthenticatedPerson(auth)
    .then(getNameFromAuthenticatedPerson)
    .then(givenName => getEventData(givenName, formattedDate))
    .then(eventData => createEvent(auth, eventData));
}

module.exports = createEventWithAuth;
