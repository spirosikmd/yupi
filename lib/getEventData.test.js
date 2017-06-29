const getEventData = require('./getEventData');

mockGetEventData = mockData => getEventData('date', mockData);

test('returns summary', () => {
  const data = mockGetEventData({ summary: 'foo' });
  expect(data.summary).toBe('foo');
});

test('returns description', () => {
  const data = mockGetEventData({ description: 'bar' });
  expect(data.description).toBe('bar');
});

test('returns reminders useDefault to true', () => {
  const data = mockGetEventData({});
  expect(data.reminders.useDefault).toBe(true);
});

test('returns start and end dates', () => {
  const data = mockGetEventData({});
  expect(data.start.date).toBe('date');
  expect(data.end.date).toBe('date');
});
