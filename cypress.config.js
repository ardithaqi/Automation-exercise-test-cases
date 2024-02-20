const { defineConfig } = require("cypress");
require("dotenv").config();

module.exports = defineConfig({
  env: {
    ...process.env,
  },
  e2e: {
    specPattern: "cypress/e2e/**/*.spec.{js,jsx,ts,tsx}",
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
