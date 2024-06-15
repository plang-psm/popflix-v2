const { defineConfig } = require('cypress');

module.exports = defineConfig({
  defaultCommandTimeout: 20000,
  screenshotsFolder: 'cypress/screenshots',
  screenshotOnRunFailure: true,
  e2e: {
    setupNodeEvents(on, config) {
    },
    baseUrl: 'http://localhost:3000/'
  },
});
