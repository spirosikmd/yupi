function getEventData(date, { summary, description }) {
  return {
    summary,
    description,
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

module.exports = getEventData;
