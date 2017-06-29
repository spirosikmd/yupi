const google = require('googleapis');
const calendar = google.calendar('v3');
const getEventData = require('./getEventData');
const getConfig = require('./getConfig');
const jsonTemplateObject = require('json-templater/object');
const additionalData = require('./additionalData');

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
  return Promise.all([getConfig(process.cwd()), additionalData(auth)])
    .then(([config, data]) => jsonTemplateObject(config, data))
    .then(additionalEventData =>
      getEventData(formattedDate, additionalEventData)
    )
    .then(eventData => createEvent(auth, eventData));
}

module.exports = createEventWithAuth;
