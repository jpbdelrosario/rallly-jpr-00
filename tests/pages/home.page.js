class HomePage {
    constructor(page) {
        this.page = page;
        this.createPollButton = 'a[href="/new"]'; // Selector for "Create Poll" button
    }

    async navigate() {
        await this.page.goto('/');
    }

    async clickCreatePoll() {
        await this.page.click(this.createPollButton);
    }
}

module.exports = HomePage;
