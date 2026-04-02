const { test , expect } = require("@playwright/test");
const { LoginPage } = require("../pageObject/LoginPage");
const { InventoryPage } = require("../pageObject/InventoryPage");

test.describe("Inventory Tests", () => {

    test.beforeAll(async ({ page }) => {
        const loginPage = new LoginPage(page);
        await page.goto("/");
    });

    
});