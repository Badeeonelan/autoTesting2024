const { assert, expect } = require('chai');
const { Builder, Browser } = require('selenium-webdriver');
const fs = require('fs');
const { promisify } = require('util');
const writeFileAsync = promisify(fs.writeFile);
const MainPageMobile = require('../../pages/yandex/yandex_mainpage_mobile');
const MainPage = require('../../pages/yandex/yandex_mainpage');

describe('Yandex Test', () => {
    let driver;
    let mainPage;
    let mainPageMobile;
    before(async () => {
        driver = await new Builder().forBrowser(Browser.CHROME).build();
        mainPage = new MainPage(driver);
        mainPageMobile = new MainPageMobile(driver);
    });
    after(async () => {
        await driver.quit();
    });
    afterEach(async function() {
        if (this.currentTest.state === 'failed') {
            const screenshot = await driver.takeScreenshot();
            const testCaseName = this.currentTest.title.replace(/\s+/g, '-').toLowerCase();
            const dateTime = new Date().toISOString().replace(/[-:.]/g, '');
            const fileName = `${testCaseName}-${dateTime}.png`;
            await writeFileAsync(fileName, screenshot, 'base64');
        }
    });
    it('should search for Samsung phones', async () => {
        await mainPage.open();
        const size = await mainPage.checkStartPage();
        expect (size).to.length=0;
        await mainPage.clickCatalog();
        await mainPage.hoverGaming();
        await mainPage.clickGamingPhone();
        //const header = await mainPageMobile.checkPage();
        //expect (header).to.equal("Игровые телефоны");
        await mainPageMobile.logElements();
        await mainPageMobile.setFilter();
        const name = await mainPageMobile.checkName();
        await driver.sleep(1000);
        expect(name).to.be.true;
    });
})