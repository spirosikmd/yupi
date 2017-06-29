function getTokenDir() {
  return (
    (process.env.HOME || process.env.HOMEPATH || process.env.USERPROFILE) +
    '/.credentials/'
  );
}

module.exports = getTokenDir;
