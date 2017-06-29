const getAuthenticatedPersonName = require('./getAuthenticatedPersonName');

function getAdditionalData(auth) {
  const getDataFunctions = [getAuthenticatedPersonName(auth)];
  return Promise.all(getDataFunctions).then(data => Object.assign({}, ...data));
}

module.exports = getAdditionalData;
