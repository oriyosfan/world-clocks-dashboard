import { defineConfig } from 'cypress';

export default defineConfig({
  retries: 1,
  video: true,
  viewportWidth: 1280,
  viewportHeight: 800,
  screenshotOnRunFailure: true,
  e2e: {
    supportFile: false,
    specPattern: 'cypress/e2e/**/*.cy.{js,jsx,ts,tsx}',
    baseUrl: process.env.BASE_URL || 'http://localhost:3000',
  },
});
