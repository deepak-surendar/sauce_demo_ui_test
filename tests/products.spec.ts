import { test, expect } from '@playwright/test';
import { InventoryPage } from '../pages/InventoryPage';
import * as testData from './data/testData.json';
import * as utils from './utils/utils';

interface Product {
  name: string;
  description: string;
  price: number;
  currency: string;
}

test('User can add a backpack to the cart', async ({ page }) => {
  const inventoryPage = new InventoryPage(page);
  const productsData: Product[] = testData.products;

  // 1. Setup
  await inventoryPage.navigateTo('/inventory.html');

  // 2. Action
  await inventoryPage.addToCart('Sauce Labs Bike Light');

  // 3. Assertion
  const cartCount = await inventoryPage.getCartCount();
  expect(cartCount).toBe('1');
  // check default sort order - ascending by name
  utils.sortByKey(productsData, 'name', 'asc');
  await expect(inventoryPage.productsList)
    .toContainText([productsData[0].name,
    productsData[1].name,
    productsData[2].name,
    productsData[3].name,
    productsData[4].name,
    productsData[5].name]);
});

test('Verify all products match test data', async ({ page }) => {
  const inventoryPage = new InventoryPage(page);

  // 1. Action
  await inventoryPage.navigateTo('/inventory.html');

  // 2. Assertion
  for (const product of testData.products) {
    const nameLocator = inventoryPage.getProductNameLocator(product.name);
    const descLocator = inventoryPage.getProductDescLocator(product.name);
    const priceLocator = inventoryPage.getProductPriceLocator(product.name);
    const imgLocator = inventoryPage.getProductImageLocator(product.name);

    await expect(nameLocator).toHaveText(product.name);
    await expect(descLocator).toHaveText(product.description);
    await expect(priceLocator).toHaveText(`\$${product.price}`);
    await expect(imgLocator).toBeVisible();
  }
});

testData.sortBy.forEach((sortByValue: string, index: number) => {
  test(`Can sort products by - ${sortByValue}`, async ({ page }) => {
    const inventoryPage = new InventoryPage(page);
    const productsData: Product[] = testData.products;

    await inventoryPage.navigateTo('/inventory.html');
    await inventoryPage.selectSortByDropdown(testData.sortBy[index]);

    // check sort order - descending by name
    switch (index) {
      case 2:
        utils.sortByKey(productsData, 'name', 'asc');
        break;
      case 3:
        utils.sortByKey(productsData, 'price', 'desc');
        break;
      case 4:
        utils.sortByKey(productsData, 'price', 'desc');
        break;
      case 1:
      default:
        utils.sortByKey(productsData, 'name', 'asc');
        break;
    }
    // utils.sortByKey(productsData, key, sortOrder);
    await expect(inventoryPage.productsList)
      .toContainText([productsData[0].name,
      productsData[1].name,
      productsData[2].name,
      productsData[3].name,
      productsData[4].name,
      productsData[5].name]);
  });
});


test('Can sort products - high to low price', async ({ page }) => {
  const inventoryPage = new InventoryPage(page);
  const productsData: Product[] = testData.products;

  await inventoryPage.navigateTo('/inventory.html');
  await inventoryPage.selectSortByDropdown(testData.sortBy[3]);

  // check sort order - high to low price
  utils.sortByKey(productsData, 'price', 'desc');
  await expect(inventoryPage.productsList)
    .toContainText([productsData[0].name,
    productsData[1].name,
    productsData[2].name,
    productsData[3].name,
    productsData[4].name,
    productsData[5].name]);
});
