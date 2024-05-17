const { beforeEach, afterEach } = require('mocha');
const GoogleHomePage = require('../../pages/google/google_homepage');

describe('Google test', async function() {

    beforeEach(async function() {
        await GoogleHomePage.open();
    })

    it('opens Google home page and search', async function() {
        await GoogleHomePage.enterSearch('something');
    })

    afterEach(async function() {
        await GoogleHomePage.closeBrowser();
    })
})