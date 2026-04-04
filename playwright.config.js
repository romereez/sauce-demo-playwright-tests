const { defineConfig, devices } = require("@playwright/test");
require("dotenv").config();

module.exports = defineConfig({
  reporter: [["html", { open: "never" }]],
  use: {
    trace: "on-first-retry",
  },
  projects: [
    {
      name: "UI Test",
      testDir: "./tests",
      use: {
        baseURL: process.env.BASE_URL,
        ...devices["Desktop Chrome"],
        launchOptions: {
          args: ["--force-dark-mode"],
        },
      },
    },
  ],
  timeout: 30 * 1000,
  screenshot: "only-on-failure",
  workers: 2,
});
