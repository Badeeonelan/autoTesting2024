import { MospolytechPage } from "../../pages/mospolytech/polytech_mainpage.js";
import { beforeEach, afterEach, describe, it } from "mocha";
import { assert } from "chai";

const mospolytechPage = new MospolytechPage('221-323');

describe('Mospolytech Page Test Suite', () => {

    before(async () => {
        await mospolytechPage.open();
    });

    it('should open the schedule', async () => {
        await mospolytechPage.openScheduleTable();
    });

    it('should check if a new tab is opened', async () => {
        const isNewTabOpened = await mospolytechPage.openExternalScheduleSiteInNewWindow();
        assert.isTrue(isNewTabOpened, 'A new tab was not opened');
    });

    it('should enter the group number', async () => {
        await mospolytechPage.enterGroupNumber();
    });

    it('should check the number of groups in the list and if the required group is present', async () => {
        const isSingleGroupFound = await mospolytechPage.getGroups();
        const isMyGroupFound = await mospolytechPage.findGroup();
        assert.isTrue(isSingleGroupFound, 'More than one group was found');
        assert.isTrue(isMyGroupFound, 'The found group does not match the specified one');
    });

    it('should check if the current day in the schedule is highlighted', async () => {
        await mospolytechPage.clickGroup();
        assert.isTrue(await mospolytechPage.checkColorOfCurrentDay());
    });

    afterEach(async function () {
        if (this.currentTest.state === 'failed') {
            await mospolytechPage.captureScreenshot(this.currentTest.title);
            console.log(`Screenshot saved in folder screenshots/lab2/${this.currentTest.title}`);
        }
    });

    after(async () => {
        await mospolytechPage.closeBrowser();
    });
});
