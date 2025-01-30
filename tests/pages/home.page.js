class HomePage {
    constructor(page) {
        this.page = page;
        this.createPollButton = 'a[href="/new"]'; // Selector for "Create Poll" button
    }

    async navigate() {
        await this.page.goto('http://localhost:3000/');
    }

    async clickCreatePoll() {
        await this.page.click(this.createPollButton);
    }
}

module.exports = HomePage;
