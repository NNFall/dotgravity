import { defineConfig } from "@playwright/test";

const localTestPort = 4174;
const baseURL = `http://127.0.0.1:${localTestPort}`;

export default defineConfig({
  testDir: "./tests",
  testMatch: ["browser/**/*.spec.ts", "visual/**/*.spec.ts"],
  retries: 0,
  workers: 1,
  use: {
    baseURL,
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
    command: `npm.cmd run build && npm.cmd run start -- --hostname 127.0.0.1 --port ${localTestPort}`,
    url: baseURL,
    reuseExistingServer: false,
    timeout: 240_000,
  },
});
