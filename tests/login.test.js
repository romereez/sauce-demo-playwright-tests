const { test, expect } = require("@playwright/test");
const { LoginPage } = require("../pageObject/LoginPage");
const { InventoryPage } = require("../pageObject/InventoryPage");
test.describe("Login Tests", () => {
  test("Successful Login", async ({ page }) => {
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);

    await page.goto("/");

    await loginPage.login(process.env.STANDARD_USER, process.env.PASSWORD);
    await expect(inventoryPage.inventoryHeader).toBeVisible();
    await expect(inventoryPage.inventoryList).toBeVisible();
    await expect(page).toHaveURL("/inventory.html");
    console.log("Successful Login Test Passed");
  });

  test("Login with Locked Out User", async ({ page }) => {
    const loginPage = new LoginPage(page);

    await page.goto("/");
    await loginPage.login(process.env.LOCKED_OUT_USER, process.env.PASSWORD);
    await expect(loginPage.errorMessage).toBeVisible();
    await expect(loginPage.errorMessage).toHaveText(
      "Epic sadface: Sorry, this user has been locked out.",
    );
    await expect(page).not.toHaveURL("/inventory.html");
    console.log("Login with Locked Out User Test Passed");
  });

  test("Login with Problem User", async ({ page }) => {
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);

    await page.goto("/");
    await loginPage.login(process.env.PROBLEM_USER, process.env.PASSWORD);
    await expect(inventoryPage.inventoryHeader).toBeVisible();
    await expect(inventoryPage.inventoryList).toBeVisible();
    await expect(page).toHaveURL("/inventory.html");
    const count = await inventoryPage.countImgs(inventoryPage.problemImg);
    expect(count).toBe(6);
  });
  
   test("Login with glitch user", async ({ page }) => {
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);

    await page.goto("/");
    await loginPage.login(process.env.GLITCH_USER, process.env.PASSWORD);
    await expect(inventoryPage.inventoryHeader).toBeVisible();
    await expect(inventoryPage.inventoryList).toBeVisible();
    await expect(page).toHaveURL("/inventory.html");
     
   });
});
