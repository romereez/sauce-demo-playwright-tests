const { expect } = require("@playwright/test");

exports.LoginPage = class LoginPage {
  /**
   * @param {import('@playwright/test').Page} page
   */

  constructor(page) {
    this.page = page;
    this.usernameInput = page.locator('//*[@id="user-name"]');
    this.passwordInput = page.locator('//*[@id="password"]');
    this.loginButton = page.locator('//*[@id="login-button"]');
    this.errorMessage = page.locator('[data-test="error"]');
  }

  async login(username, password) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }
};
