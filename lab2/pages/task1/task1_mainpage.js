import { By } from "selenium-webdriver";
import { BasePage } from "../basepage.js";

export class LambdaPage extends BasePage {
    async fetchElements() {
        this.totalItems = (await driver.findElements(By.xpath(`//li[@class='ng-scope']/input`))).length;
        this.incompleteItems = (await driver.findElements(By.xpath(`//span[@class='done-false']`))).length;
        return { total: this.totalItems, incomplete: this.incompleteItems };
    }

    async openPage() {
        await this.navigateToUrl('https://lambdatest.github.io/sample-todo-app/');
    }

    async verifyTitle() {
        await this.fetchElements();
        const titleText = await this.fetchText(By.xpath('//span[@class="ng-binding"]'));
        return titleText === `${this.incompleteItems} of ${this.totalItems} remaining`;
    }

    async toggleItem(id) {
        await driver.findElement(By.xpath(`//input[@name='li${id}']`)).click();
    }

    async isItemCompleted(item) {
        return (await item.getAttribute('class')) === 'done-true';
    }

    async retrieveItem(itemId) {
        return await driver.findElement(By.xpath(`//input[@name='li${itemId}']/following-sibling::span`));
    }

    async isItemIncomplete(item) {
        return (await item.getAttribute('class')) === 'done-false';
    }

    async addItem(text) {
        await this.typeText(By.id('sampletodotext'), text);
        await this.pressButton(By.id('addbutton'));
        await this.fetchElements();
    }

    get totalItemCount() {
        return this.totalItems;
    }

    get incompleteItemCount() {
        return this.incompleteItems;
    }
}
