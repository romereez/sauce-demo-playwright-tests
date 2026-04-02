const { test, expect } = require("@playwright/test");
const { LoginPage } = require("../pageObject/LoginPage");
const { InventoryPage } = require("../pageObject/InventoryPage");

test.describe("Inventory Tests", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("Inventory Standard User", async ({ page }) => {
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);

    await loginPage.login(process.env.STANDARD_USER, process.env.PASSWORD);
  });
});
