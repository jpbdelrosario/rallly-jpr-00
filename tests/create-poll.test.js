const { test, expect } = require('@playwright/test');
const HomePage = require('./pages/home.page.js');
const CreatePollPage = require('./pages/create-poll.page.js');

test.describe('Create Poll Page Tests', () => {
    let createPollPage;

    test.beforeEach(async ({ page }) => {
        const homePage = new HomePage(page);
        await homePage.navigate();
        await homePage.clickCreatePoll();
        createPollPage = new CreatePollPage(page);
    });

    test('should successfully create a poll with all fields filled', async ({ page }) => {
        const title = 'Sprint Retro Meeting';
        const location = 'Team zoom link';
        const description = 'What worked? What did not work?';
        const day = 29; // Example day

        // Fill in poll details and select date
        await createPollPage.fillPollDetails(title, location, description, day);

        // Submit the poll
        await createPollPage.submitPoll();

        // Verify successful submission
        await expect(page).toHaveURL(/poll\/[a-zA-Z0-9-]+/);

    });

    test('should successfully create a poll with title and date only (location is optional)', async ({ page }) => {
        const title = 'Sprint Retro Meeting';
        const location = ''; // Location is blank
        const description = 'What worked? What did not work?';
        const day = 29; // Example day

        // Fill in poll details and select date
        await createPollPage.fillPollDetails(title, location, description, day);

        // Submit the poll
        await createPollPage.submitPoll();

        // Verify successful submission
        await expect(page).toHaveURL(/poll\/[a-zA-Z0-9-]+/);

    });

    test('should successfully create a poll with title and date only (description is optional)', async ({ page }) => {
        const title = 'Sprint Retro Meeting';
        const location = 'Team zoom link';
        const description = ''; // Description is blank
        const day = 29; // Example day

        // Fill in poll details and select date
        await createPollPage.fillPollDetails(title, location, description, day);

        // Submit the poll
        await createPollPage.submitPoll();

        // Verify successful submission
        await expect(page).toHaveURL(/poll\/[a-zA-Z0-9-]+/);

    });


    test('should display error when title is not filled', async ({ page }) => {
        const title = '';
        const location = 'Team zoom link';
        const description = 'What worked? What did not work?';
        const day = 22; // Example day

        // Fill in poll details and select date
        await createPollPage.fillPollDetails(title, location, description, day);

        // Try to submit the poll
        await createPollPage.submitPoll();

        // Check for the error message
        await expect(page.locator('p.text-destructive.text-sm')).toContainText('“Title” is required');
    });

    test('should display error when date is not filled', async ({ page }) => {
        const title = 'Sprint Retro Meeting';
        const location = 'Team zoom link';
        const description = 'What worked? What did not work?';
        const day = null; // No date selected

        // Fill in poll details
        await createPollPage.fillPollDetails(title, location, description, day);

        // Try to submit the poll
        await createPollPage.submitPoll();

        // Check for the error message
        await expect(page.locator('p.text-destructive.text-sm')).toContainText("You can't create a poll without any options. Add at least one option to continue.");
    });


});
