import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./tests",
  testMatch: ["browser/**/*.spec.ts", "visual/**/*.spec.ts"],
  retries: 0,
  workers: 1,
  use: {
    baseURL: "http://127.0.0.1:4173",
    locale: "ru-RU",
    timezoneId: "Europe/Samara",
    deviceScaleFactor: 1,
    colorScheme: "light",
    serviceWorkers: "block",
    trace: "retain-on-failure",
    screenshot: "only-on-failure",
    video: "retain-on-failure",
  },
  projects: [
    {
      name: "chromium",
      use: {
        browserName: "chromium",
      },
    },
  ],
  webServer: {
    command: "npm.cmd run dev -- --host 127.0.0.1 --port 4173",
    url: "http://127.0.0.1:4173",
    reuseExistingServer: false,
  },
});
