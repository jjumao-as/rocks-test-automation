const loginLocators = require('../locators/loginLoc');
const ActionDriver = require('../../utils/ActionDriver');
const { chromium } = require('@playwright/test');

exports.LoginPage = class LoginPage {
    constructor(page) {
        this.page = page;
        this.actionDriver = new ActionDriver(page);
    }



    async login(username, password) {
        await this.page.goto('/', { timeout: 190000 });

        await this.actionDriver.setText(loginLocators.email, username);
        await this.actionDriver.setText(loginLocators.password, password);
        await this.actionDriver.clickButton(loginLocators.signIn);
    }

    async checkVisibility(text) {
        await this.actionDriver.checkVisibility(text);
    }

    async launchBrowser(browser) {
        if(browser === 'chromium'){ await chromium.launch(); }
        if(browser === 'firefox'){ await firefox.launch(); }
    }
}