const { By, Key } = require('selenium-webdriver');
var BasePage = require('../basepage.mjs');

class GoogleHomePage extends BasePage {

    get searchField() {
        return By.name('q');
    }

    async open() {
        await this.goToUrl('https://www.google.ru/');
    }

    async enterSearch(searchText) {
        await this.enterText(this.searchField, searchText);
        await this.enterText(this.searchField, Key.ENTER);
    }
}

module.exports = new GoogleHomePage();