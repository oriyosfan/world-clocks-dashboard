/* eslint-disable */
const { defineConfig } = require('cypress');

module.exports = defineConfig({
  video: true,
  screenshotOnRunFailure: true,
  retries: 1,
  viewportWidth: 1280,
  viewportHeight: 800,
  e2e: {
    baseUrl: process.env.CYPRESS_BASE_URL || 'http://localhost:3002',
    specPattern: 'cypress/e2e/**/*.cy.{js,jsx,ts,tsx}',
    supportFile: false,
  },
});
