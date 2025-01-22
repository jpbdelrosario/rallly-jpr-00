class CreatePollPage {
    constructor(page) {
        this.page = page;
        this.titleInput = 'input[name="title"]'; // Title input field
        this.locationInput = 'input[name="location"]'; // Location input field
        this.descriptionTextarea = 'textarea[name="description"]'; // Description textarea
        this.submitButton = 'button[type="submit"]'; // Submit poll button
        this.previousMonthButton = '[title="Previous month"]';
        this.nextMonthButton = '[title="Next month"]';
        this.todayButton = 'button[type="button"]:has-text("Today")';
        this.dateButtons = '.grid button'; // Adjust selector if needed
        this.specifyTimesSwitch = '[data-testid="specify-times-switch"]';
    }

    async fillPollDetails(title, location, description, day) {
        if (title) await this.page.fill(this.titleInput, title);
        if (location) await this.page.fill(this.locationInput, location);
        if (description) await this.page.fill(this.descriptionTextarea, description);
        if (day) await this.selectDate(day); // Use the date picker to select a date
    }

    async submitPoll() {
        await this.page.click(this.submitButton);
    }

    async selectDate(day) {
        const dateLocator = `.z-10:has-text("${day}")`;
        await this.page.click(dateLocator);
    }

    async selectToday() {
        await this.page.click(this.todayButton);
    }

    async toggleSpecifyTimes() {
        await this.page.click(this.specifyTimesSwitch);
    }
}

module.exports = CreatePollPage;
