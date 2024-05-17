import { beforeEach, afterEach, describe, it } from "mocha";
import { assert } from "chai";
import { LambdaPage } from "../../pages/task1/task1_mainpage.js";

const lambdaPage = new LambdaPage();

describe('Lambda Test Suite', () => {
    before(async () => {
        await lambdaPage.openPage();
        await lambdaPage.fetchElements();
    });

    it('should verify the title', async () => {
        assert.isTrue(
            await lambdaPage.verifyTitle(),
            'Title does not match the expected value'
        );
    });

    it('should check the first checkbox is not active', async () => {
        const item = await lambdaPage.retrieveItem(1);
        assert.isTrue(
            await lambdaPage.isItemIncomplete(item),
            'The first checkbox should be inactive'
        );
    });

    it('should click the first item, check if it becomes active, and verify the title', async () => {
        const item = await lambdaPage.retrieveItem(1);
        await lambdaPage.toggleItem(1);

        assert.isTrue(
            await lambdaPage.isItemCompleted(item),
            'The first item should be active after clicking'
        );
        assert.isTrue(
            await lambdaPage.verifyTitle(),
            'Title does not match the expected value'
        );
    });

    it('should check other items are inactive, then click and check if they become active', async () => {
        const { total } = await lambdaPage.fetchElements();
        for (let i = 2; i <= total; i++) {
            const item = await lambdaPage.retrieveItem(i);
            assert.isFalse(
                await lambdaPage.isItemCompleted(item),
                `Item ${i} should be inactive`
            );
            await lambdaPage.toggleItem(i);
            assert.isTrue(
                await lambdaPage.isItemCompleted(item),
                `Item ${i} should be active after clicking`
            );
            assert.isTrue(
                await lambdaPage.verifyTitle(),
                'Title does not match the expected value'
            );
        }
    });

    it('should add a new item and verify it is inactive', async () => {
        await lambdaPage.addItem('new item');
        const { total } = await lambdaPage.fetchElements();
        const newItem = await lambdaPage.retrieveItem(total);
        assert.isFalse(
            await lambdaPage.isItemCompleted(newItem),
            'The newly added item should be inactive'
        );
        assert.isTrue(
            await lambdaPage.verifyTitle(),
            'Title does not match the expected value'
        );
    });

    it('should click the new item and verify it becomes active', async () => {
        const { total } = await lambdaPage.fetchElements();
        const newItem = await lambdaPage.retrieveItem(total);
        await lambdaPage.toggleItem(total);
        assert.isTrue(
            await lambdaPage.isItemCompleted(newItem),
            'The new item should be active after clicking'
        );
        assert.isTrue(
            await lambdaPage.verifyTitle(),
            'Title does not match the expected value after adding a new item'
        );
    });

    afterEach(async function () {
        if (this.currentTest.state === 'failed') {
            await lambdaPage.captureScreenshot(this.currentTest.title);
            console.log(`Screenshot saved in folder screenshots/lab2/${this.currentTest.title}`);
        }
    });

    after(async () => {
        await lambdaPage.shutDownBrowser();
    });
});
