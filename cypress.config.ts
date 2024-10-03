import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    supportFile: 'cypress/support/index.ts', 
    specPattern: 'cypress/e2e/**/*.ts', 
  },
});

