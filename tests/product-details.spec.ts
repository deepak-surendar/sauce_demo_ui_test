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

test('Product details view display - click from name', async ({ page }) => {
    const inventoryPage = new InventoryPage(page);
    const productDetailsPage = new ProductDetailsPage(page);

    await inventoryPage.navigateTo('/inventory.html');

    for (const product of testData.products) {
        await inventoryPage.clickProductName(product.name);
        await expect(page).toHaveURL(/inventory-item\.html/);

        await expect(productDetailsPage.productName).toHaveText(product.name);
        await expect(productDetailsPage.productDescription).toHaveText(product.description);
        await expect(productDetailsPage.productPrice).toHaveText(`\$${product.price}`);

        await productDetailsPage.clickBackToProductsButton();
    }
});

test('Product details view display - click from photo', async ({ page }) => {
    const inventoryPage = new InventoryPage(page);
    const productDetailsPage = new ProductDetailsPage(page);

    await inventoryPage.navigateTo('/inventory.html');

    for (const product of testData.products) {
        await inventoryPage.clickProductImage(product.name);
        await expect(page).toHaveURL(/inventory-item\.html/);

        await expect(productDetailsPage.productName).toHaveText(product.name);
        await expect(productDetailsPage.productDescription).toHaveText(product.description);
        await expect(productDetailsPage.productPrice).toHaveText(`\$${product.price}`);

        await productDetailsPage.clickBackToProductsButton();
    }
});

test.skip('Product details when item added to cart', async({ page }) => {

});