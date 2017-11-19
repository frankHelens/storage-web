var packageInfo = require('../package.json')

module.exports = {
  NODE_ENV: '"production"',
  VERSION: '"' + packageInfo.version + '"',
  SUBVERSION: packageInfo.subversion,
  TITLE: '"' + packageInfo.title + '"',
  API: '"/"',
  URL: '""'
}
