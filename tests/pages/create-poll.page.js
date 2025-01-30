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
        // 1. Get the calendar grid element
        const gridElement = await this.page.$('.grid.grow.grid-cols-7.rounded-md.border.bg-white.shadow-sm');

        // 2. Get all date button elements within the grid
        const dateElements = await gridElement.$$('button');

        // 3. Calculate the target date's position within the grid
        const matchingDateElements = [];
        for (let i = 0; i < dateElements.length; i++) {
            const dateText = await dateElements[i].textContent();
            if (dateText.trim() === day.toString()) {
                matchingDateElements.push(dateElements[i]);
            }
        }

        // 4. Click on the target date element
        if (matchingDateElements.length > 0) {
            await matchingDateElements[matchingDateElements.length - 1].click();
        } else {
            throw new Error(`Day ${day} not found in the current month`);
        }
    }

    async selectToday() {
        await this.page.click(this.todayButton);
    }

    async toggleSpecifyTimes() {
        await this.page.click(this.specifyTimesSwitch);
    }
}

module.exports = CreatePollPage;
