const { Given, When, Then, After } = require('@cucumber/cucumber');
const { expect, chromium } = require('@playwright/test');

// Import page objects with correct paths
const HomePage = require('../../tests/pages/home.page');
const CreatePollPage = require('../../tests/pages/create-poll.page');

let browser;
let page;
let homePage;
let createPollPage;


// Step definitions
Given('I am on the Create Poll page', async function () {
  // Initialize browser, page, and page objects
  browser = await chromium.launch();
  page = await browser.newPage();
  homePage = new HomePage(page);
  createPollPage = new CreatePollPage(page);

  await homePage.navigate();
  await homePage.clickCreatePoll();
});

When('I fill in the title with {string}', async function (title) {
  await createPollPage.fillPollDetails(title, '', '', null);
});

When('I fill in the location with {string}', async function (location) {
  await createPollPage.fillPollDetails('', location, '', null);
});

When('I fill in the description with {string}', async function (description) {
  await createPollPage.fillPollDetails('', '', description, null);
});

When('I select the date {string}', async function (day) {
  await createPollPage.selectDate(parseInt(day, 10));
});

When('I submit the poll', async function () {
  await createPollPage.submitPoll();
});

Then('the poll should be created successfully', async function () {
  await expect(page).toHaveURL(/poll\/[a-zA-Z0-9-]+/);
});

Then('an error message should be displayed for the missing title', async function () {
  await expect(page.locator('p.text-destructive.text-sm')).toContainText('“Title” is required');
});

Then('an error message should be displayed for the missing date', async function () {
    await expect(page.locator('p.text-destructive.text-sm')).toContainText("You can't create a poll without any options. Add at least one option to continue.");
});

After(async function () {
    await page.close();
    await browser.close();
  });