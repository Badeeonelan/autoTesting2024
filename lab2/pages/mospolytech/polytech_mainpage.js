import { By, Key, Builder, Browser } from "selenium-webdriver";
import { BasePage } from "../basepage.js";
import fs from 'fs';


export class MospolytechPage extends BasePage {
    constructor(group) {
        super();
        this.group = group;
    }

    async open() {
        await this.goToUrl('https://mospolytech.ru');
    }

    async findElementByXpath(xpath) {
        const element = await driver.findElement(By.xpath(xpath));
        return element;
    }

    async openScheduleTable() {
        const link = await this.findElementByXpath(`//li[@class='user-nav__item']/a[@href='/obuchauschimsya/raspisaniya/']`);
        await link.click();
        await driver.sleep(1500);
    }

    async openExternalScheduleSiteInNewWindow() {
        this.mainWindow = await driver.getWindowHandle();
        const link = await this.findElementByXpath(`//div[@class='button-group__item']/a[@href='https://rasp.dmami.ru/']`);
        await link.sendKeys(Key.CONTROL + Key.ENTER);
        const allWindows = await this.getAllWindows();
        for (const window of allWindows) {
            if (window !== this.mainWindow) {
                await driver.switchTo().window(window);
                await driver.sleep(1000);
                return this.mainWindow != window;
            }
        }
    }

    async getAllWindows() {
        const allWindows = await driver.getAllWindowHandles();
        return allWindows;
    }

    async enterGroupNumber() {
        const input = await this.findElementByXpath(`//input[@class='groups']`);
        await input.sendKeys(`${this.group}`);
        await driver.sleep(1000);
    }

    async findGroup() {
        const group = await this.findElementByXpath(`//div[@id='${this.group}']`);
        const groupText = await group.getText();
        return groupText == this.group;
    }

    async clickGroup() {
        const groupElement = await this.findElementByXpath(`//div[@id='${this.group}']`);
        await groupElement.click();
        await driver.sleep(1000);
    }

    async getGroups() {
        const allGroups = await driver.findElements(By.xpath('//div[contains(@class, "found-groups")]/div'));
        return allGroups.length === 1;
    }

    async checkColorOfCurrentDay() {
        const days = await driver.findElements(By.xpath(`//div[@class="schedule-week"]/child::div`));
        let thisDay;
        for (const day of days) {
            if (days.indexOf(day) == new Date().getDay() - 1) {
                thisDay = day;
            }
        }
        return (await thisDay.getAttribute("class")) === "schedule-day schedule-day_today";
    }

    async goToUrl(url) {
        global.driver = new Builder().forBrowser(Browser.CHROME).build();
        driver.manage().setTimeouts({ implicit: 5000 });
        await driver.get(url);
    }

    async saveScreenshot(fileName) {
        const date = this.getDateTimeString();
        try {
            const image = await driver.takeScreenshot();
            fs.writeFileSync(`../../screenshots/${fileName}_${date}.png`, image, 'base64');
        } catch (error) {
            console.error('Error while taking screenshot:', error);
        }
    };
    

    async closeBrowser() {
        await driver.sleep(1000);
        await driver.quit();
    }
}
