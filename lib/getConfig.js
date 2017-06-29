const cosmiconfig = require('cosmiconfig');

function getConfig(path) {
  const explorer = cosmiconfig('yupi');

  return explorer
    .load(path)
    .then(result => {
      if (result) {
        return result.config;
      }
      throw new Error(
        'No configuration file found 😱\nI will not use default values 🙈'
      );
    })
    .catch(parsingError => {
      console.error(parsingError);
      process.exit(1);
    });
}

module.exports = getConfig;
