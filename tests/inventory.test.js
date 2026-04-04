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
    await expect(inventoryPage.inventoryHeader).toBeVisible();
    
    await expect(inventoryPage.addToCartButtons).toHaveCount(6);

    await expect (inventoryPage.cartBadge).toBeHidden();

    const count = await inventoryPage.addToCartButtons.count();

    for (let i = 0; i < count; i++) {
      await inventoryPage.addToCartButtons.first().click();
    }
    await expect(inventoryPage.cartBadge).toHaveText("6");

    const removeCount = await inventoryPage.removeButtons.count();
    
    await expect(inventoryPage.removeButtons).toHaveCount(6);

    for (let i = 0; i < removeCount; i++) {
      await inventoryPage.removeButtons.first().click();
    }
    await expect(inventoryPage.cartBadge).toBeHidden();
    await expect(inventoryPage.addToCartButtons).toHaveCount(count);
    await expect(inventoryPage.removeButtons).toHaveCount(0);
  });
});
