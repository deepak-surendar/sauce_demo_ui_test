import { test, expect } from '@playwright/test';
import { InventoryPage } from '../pages/InventoryPage';
import * as testData from './data/testData.json';
import * as utils from './utils/utils';
import { ProductDetailsPage } from '../pages/ProductDetailsPage';

interface Product {
  name: string;
  description: string;
  price: number;
  currency: string;
}

test('Add and remove an item to the cart updates cart count', async ({ page }) => {
  const inventoryPage = new InventoryPage(page);
  const productsData: Product[] = testData.products;

  // 1. Setup
  await inventoryPage.navigateTo('/inventory.html');

  // 2. Action
  await inventoryPage.addToCart(productsData[0].name);

  // 3. Assertion
  let cartCount = await inventoryPage.getCartCount();
  expect(cartCount).toBe('1');

  await inventoryPage.removeFromCart(productsData[0].name);
  cartCount = await inventoryPage.getCartCount();
  expect(cartCount).toBe('');
});

test('Verify all the products are in inventory', async ({ page }) => {
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
      case 1:
        utils.sortByKey(productsData, 'name', 'desc');
        break;
      case 2:
        utils.sortByKey(productsData, 'price', 'asc');
        break;
      case 3:
        utils.sortByKey(productsData, 'price', 'desc');
        break;
      case 0:
      default:
        utils.sortByKey(productsData, 'name', 'asc');
        break;
    }
    await expect(inventoryPage.productsList)
      .toContainText([productsData[0].name,
      productsData[1].name,
      productsData[2].name,
      productsData[3].name,
      productsData[4].name,
      productsData[5].name]);
  });
});

test('Add multiple items to cart', async ({ page }) => {
  const inventoryPage = new InventoryPage(page);
  const productsData: Product[] = testData.products;

  await inventoryPage.navigateTo('/inventory.html');

  await inventoryPage.addToCart(productsData[0].name);
  let cartCount = await inventoryPage.getCartCount();
  expect(cartCount).toBe('1');

  await inventoryPage.addToCart(productsData[1].name);
  cartCount = await inventoryPage.getCartCount();
  expect(cartCount).toBe('2');

  await inventoryPage.addToCart(productsData[2].name);
  await inventoryPage.addToCart(productsData[3].name);
  await inventoryPage.addToCart(productsData[4].name);
  await inventoryPage.addToCart(productsData[5].name);
  cartCount = await inventoryPage.getCartCount();
  expect(cartCount).toBe('6');
});