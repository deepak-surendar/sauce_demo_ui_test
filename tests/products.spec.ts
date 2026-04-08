import { test, expect } from '@playwright/test';
import { InventoryPage } from '../pages/InventoryPage';

test('User can add a backpack to the cart', async ({ page }) => {
  const inventoryPage = new InventoryPage(page);

  // 1. Setup
  await inventoryPage.navigateTo('/inventory.html');
  console.log(await inventoryPage.productsList.allTextContents());
  expect(await inventoryPage.productsList.count()).toEqual(6);

  // 2. Action
  await inventoryPage.addToCart('Sauce Labs Bike Light');

  // 3. Assertion
  const cartCount = await inventoryPage.getCartCount();
  expect(cartCount).toBe('1');
})