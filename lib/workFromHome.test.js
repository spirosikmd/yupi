jest.mock('./loadClientSecrets');
jest.mock('./authorize');
jest.mock('./createWorkFromHomeEventWithAuth');
jest.mock('dateformat');
jest.mock('chrono-node');
const loadClientSecrets = require('./loadClientSecrets');
const authorize = require('./authorize');
const createWorkFromHomeEventWithAuth = require('./createWorkFromHomeEventWithAuth');
const dateFormat = require('dateformat');
const chrono = require('chrono-node');
const workFromHome = require('./workFromHome');

const mockAuth = {};
loadClientSecrets.mockImplementation(() => Promise.resolve('secrets'));
authorize.mockImplementation(() => mockAuth);
dateFormat.mockImplementation(() => '2017-06-12');
chrono.parseDate.mockImplementation(() => '2017-06-12T00:00:00.000Z');

test('calls loadClientSecrets and authorize with secrets', () => {
  return workFromHome('next wednesday').then(() => {
    expect(loadClientSecrets).toHaveBeenCalled();
    expect(authorize).toHaveBeenCalledWith('secrets');
    expect(chrono.parseDate).toHaveBeenCalledWith('next wednesday');
    expect(dateFormat).toHaveBeenCalledWith(
      new Date('2017-06-12T00:00:00.000Z'),
      'isoDate'
    );
    expect(createWorkFromHomeEventWithAuth).toHaveBeenCalledWith(
      mockAuth,
      '2017-06-12'
    );
  });
});
