module.exports = function() {
  return {
    files: ['lib/**/*.js', '!lib/**/*.test.js'],

    tests: ['lib/**/*.test.js'],

    env: {
      type: 'node',
      runner: 'node'
    },

    testFramework: 'jest'
  };
};
