// protractor.conf.js
exports.config = {
  framework: 'jasmine',  // Definiert Jasmine als Test-Framework
  specs: ['e2e/**/*.e2e-spec.ts'],  // Der Pfad zu den E2E-Tests
  capabilities: {
    browserName: 'chrome',  // Chrome als Test-Browser
  },
  directConnect: true,  // Direktverbindung zum Browser ohne WebDriver
  allScriptsTimeout: 11000,
  getPageTimeout: 10000,
  jasmineNodeOpts: {
    defaultTimeoutInterval: 30000,
  },
};