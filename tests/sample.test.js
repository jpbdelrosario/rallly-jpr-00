const { test, expect } = require('@playwright/test');

test('Verify homepage loads correctly', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle(/Rallly/); // Update with your app's actual title
});