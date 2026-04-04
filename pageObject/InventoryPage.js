const { expect } = require("@playwright/test");

exports.InventoryPage = class InventoryPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    this.inventoryList = page.locator('[data-test="inventory-list"]');
    this.inventoryHeader = page.locator(
      '//*[@id="header_container"]/div[1]/div[2]/div',
    );
    this.addToCartButtons = page.locator(`[data-test^="add-to-cart-"]`);
    this.removeButtons = page.locator(`[data-test^="remove"]`);
    this.problemImg = "/static/media/sl-404.168b1cce10384b857a6f.jpg";
    this.cartBadge= page.locator(`//*[@id="shopping_cart_container"]/a/span`);
  }

  async countImgs(src) {
    const count = await this.page.locator(`img[src="${src}"]`).count();
    console.log(
      `[InventoryPage] Identical images on the page ${count} times | src: ${src}`,
    );
    return count;
  }
};
