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

    await loginPage.usernameInput.fill(process.env.GLITCH_USER);
    await expect(loginPage.usernameInput).toHaveValue(process.env.GLITCH_USER);
    await loginPage.passwordInput.fill(process.env.PASSWORD);
    await expect(loginPage.passwordInput).toHaveValue(process.env.PASSWORD);
    
    const startTime = Date.now();
    await loginPage.loginButton.click();
    await inventoryPage.inventoryList.waitFor({ state: "visible" });
    const endTime = Date.now();

    await expect(inventoryPage.inventoryHeader).toBeVisible();
    await expect(page).toHaveURL("/inventory.html");
    const duration = endTime - startTime;
    expect(duration).toBeGreaterThanOrEqual(4000);
    
    console.log("Log in duration:" + duration / 1000 + " seconds");
  });

  test("Login with Error User", async ({ page }) => {
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);
     
    await page.goto("/");
    await loginPage.login(process.env.ERROR_USER, process.env.PASSWORD);
    await expect(page).toHaveURL("/inventory.html");
    await inventoryPage.inventoryList.waitFor({ state: "visible" });
  });

  test("Visual User Login", async ({ page }) => {
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);
     
    await page.goto("/");
    await loginPage.login(process.env.VISUAL_USER, process.env.PASSWORD);
    await expect(page).toHaveURL("/inventory.html");
    await inventoryPage.inventoryList.waitFor({ state: "visible" });
  });
  
});
