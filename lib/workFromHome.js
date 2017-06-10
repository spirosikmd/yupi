const dateFormat = require('dateformat');
const chrono = require('chrono-node');
const loadClientSecrets = require('./loadClientSecrets');
const authorize = require('./authorize');
const createWorkFromHomeEventWithAuth = require('./createWorkFromHomeEventWithAuth');

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

  return loadClientSecrets()
    .then(secrets => authorize(secrets))
    .then(auth => createWorkFromHomeEventWithAuth(auth, formattedDate));
}

module.exports = workFromHome;
