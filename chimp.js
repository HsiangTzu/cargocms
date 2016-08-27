// default config: https://github.com/xolvio/chimp/blob/master/src/bin/default.js
var ip = require("ip");
var host = ip.address();

module.exports = {
  // browser: 'firefox',
  webdriverio: {
    baseUrl: 'http://'+host+':1338',
    waitforTimeout: 5000,
    screenshotPath: __dirname+"/test/e2e/screenshot"
  },
};
