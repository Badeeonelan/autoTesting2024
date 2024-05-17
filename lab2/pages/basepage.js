import { Builder, Browser } from 'selenium-webdriver';
import fs from 'fs';

export class BasePage {
    async navigateToUrl(url) {
        global.driver = new Builder().forBrowser(Browser.CHROME).build();
        await driver.manage().setTimeouts({ implicit: 5000 });
        await driver.get(url);
    }

    async typeText(locator, text) {
        await driver.findElement(locator).sendKeys(text);
    }

    async pressButton(locator) {
        await driver.findElement(locator).click();
    }

    async fetchText(locator) {
        return await driver.findElement(locator).getText();
    }

    getCurrentDateTime() {
        const now = new Date();
        return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}-${String(now.getHours()).padStart(2, '0')}-${String(now.getMinutes()).padStart(2, '0')}-${String(now.getSeconds()).padStart(2, '0')}`;
    }

    async captureScreenshot(fileName) {
        const timestamp = this.getCurrentDateTime();
        const image = await driver.takeScreenshot();
        fs.writeFileSync(`../../screenshots/${fileName}_${timestamp}.png`, image, 'base64');
    }

    async shutDownBrowser() {
        await driver.sleep(1000);
        await driver.quit();
    }
}
