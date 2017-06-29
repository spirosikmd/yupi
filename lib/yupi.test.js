jest.mock('./loadClientSecrets');
jest.mock('./authorize');
jest.mock('./createEventWithAuth');
jest.mock('dateformat');
jest.mock('chrono-node');
const loadClientSecrets = require('./loadClientSecrets');
const authorize = require('./authorize');
const createEventWithAuth = require('./createEventWithAuth');
const dateFormat = require('dateformat');
const chrono = require('chrono-node');
const yupi = require('./yupi');

const mockAuth = {};
loadClientSecrets.mockImplementation(() => Promise.resolve('secrets'));
authorize.mockImplementation(() => mockAuth);
dateFormat.mockImplementation(() => '2017-06-12');
chrono.parseDate.mockImplementation(() => '2017-06-12T00:00:00.000Z');

test('calls loadClientSecrets and authorize with secrets', () => {
  return yupi('next wednesday').then(() => {
    expect(loadClientSecrets).toHaveBeenCalled();
    expect(authorize).toHaveBeenCalledWith('secrets');
    expect(chrono.parseDate).toHaveBeenCalledWith('next wednesday');
    expect(dateFormat).toHaveBeenCalledWith(
      new Date('2017-06-12T00:00:00.000Z'),
      'isoDate'
    );
    expect(createEventWithAuth).toHaveBeenCalledWith(mockAuth, '2017-06-12');
  });
});

test('fails without given date', () => {
  process.exit = jest.fn();
  console.log = jest.fn();
  yupi();
  expect(process.exit).toHaveBeenCalledWith(1);
});

test('fails when parsing date fails', () => {
  chrono.parseDate.mockImplementation(() => null);
  process.exit = jest.fn();
  console.log = jest.fn();
  yupi('next wednesday');
  expect(process.exit).toHaveBeenCalledWith(1);
});
