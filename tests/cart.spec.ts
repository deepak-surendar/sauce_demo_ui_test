import { test, expect } from '@playwright/test';
import { InventoryPage } from '../pages/InventoryPage';
import { CartPage } from '../pages/CartPage';
import * as testData from './data/testData.json';

interface Product {
  name: string;
  description: string;
  price: number;
  currency: string;
}

test('Validate products in cart display as expected', async ({ page }) => {
  const inventoryPage = new InventoryPage(page);
  const cartPage = new CartPage(page);
  const productsData: Product[] = testData.products;

  await inventoryPage.navigateTo('/inventory.html');

  await inventoryPage.addToCart(productsData[0].name);

  await inventoryPage.shoppingCartLink.click();
  await expect(page).toHaveURL(/cart\.html/);
  await expect(cartPage.secondaryHeaderText).toHaveText('Your Cart');

  const productData = productsData[0];
  const quantityLocator = cartPage.getItemQuantityLocator(productData.name);
  const nameLocator = cartPage.getCartItemNameLocator(productData.name);
  const descLocator = cartPage.getCartItemDescLocator(productData.name);
  const priceLocator = cartPage.getCartItemPriceLocator(productData.name);

  await expect(quantityLocator).toHaveText('1');
  await expect(nameLocator).toHaveText(productData.name);
  await expect(descLocator).toHaveText(productData.description);
  await expect(priceLocator).toHaveText(`${productData.currency}${productData.price}`);
});