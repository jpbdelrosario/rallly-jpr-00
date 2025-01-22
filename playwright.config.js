const { devices } = require('@playwright/test');

/** @type {import('@playwright/test').PlaywrightTestConfig} */
const config = {
    testDir: './tests',
    timeout: 30000,
    retries: 0,
    use: {
        baseURL: 'http://localhost:3000', // Update this with your app's local URL
        browserName: 'chromium',
        headless: false, // Set to true if you want tests to run without a UI
    },
};

module.exports = config;
