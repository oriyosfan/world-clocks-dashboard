import { defineConfig } from 'cypress';

export default defineConfig({
  video: true,
  screenshotOnRunFailure: true,
  retries: 1,
  viewportWidth: 1280,
  viewportHeight: 800,
  e2e: {
    baseUrl: process.env.BASE_URL || 'http://localhost:3000',
    specPattern: 'cypress/e2e/**/*.cy.{js,jsx,ts,tsx}',
    supportFile: false,
  },
});
