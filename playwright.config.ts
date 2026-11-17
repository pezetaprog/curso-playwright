import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';
import path from 'path';
dotenv.config({ path: path.resolve(__dirname, '.env') });

export default defineConfig({
  fullyParallel: false,
  reporter: [
    ['list'],
    ['html', { open: 'never' }],
  ],
  use: {
    screenshot: 'only-on-failure',
    video: 'on',
    trace: 'on',
  },

  projects: [
    {
      name: 'wiki',
      testDir: './wiki/tests',
      use: {
        ...devices['Desktop Chrome'],
        channel: 'msedge',
        launchOptions: {
          args: ['--disable-blink-features=AutomationControlled'],
        },
        baseURL: 'https://bindingofisaacrebirth.wiki.gg',
      },
    },
  ],
});
