// playwright.config.ts
import { defineConfig } from '@playwright/test';
import dotenv from 'dotenv';

dotenv.config();

export default defineConfig({
  use: {
    baseURL: 'https://gorest.co.in/public/v2',
  },
  testDir: './tests',
});
