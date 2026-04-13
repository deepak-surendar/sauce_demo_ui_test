import { type Locator, type Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class InventoryPage extends BasePage {
    constructor(page: Page) {
        super(page);
    }

    // Getter Locators
    get secondaryHeaderText(): Locator {
        return this.page.getByText('Products', { exact: true });
    }

    get productsList(): Locator {
        return this.page.locator('[data-test="inventory-item"]');
    }

    get sortSelect(): Locator {
        return this.page.locator('[data-test="product-sort-container"]');
    }

    // Methods
    async addToCart(productName: string) {
        await this.productsList
            .filter({ hasText: productName })
            .getByRole('button', { name: 'Add to cart' })
            .click();
    }

    async removeFromCart(productName: string) {
        await this.productsList
            .filter({ hasText: productName })
            .getByRole('button', { name: 'Remove' })
            .click();
    }

    async getCartBadgeCount() {
        return await this.shoppingCartLink.textContent();
    }

    getProductNameLocator(productName: string): Locator {
        return this.productsList
            .filter({ hasText: productName })
            .locator('[data-test="inventory-item-name"]');
    }

    getProductDescLocator(productName: string): Locator {
        return this.productsList
            .filter({ hasText: productName })
            .locator('[data-test="inventory-item-desc"]');
    }

    getProductPriceLocator(productName: string): Locator {
        return this.productsList
            .filter({ hasText: productName })
            .locator('[data-test="inventory-item-price"]');
    }

    getProductImageLocator(productName: string): Locator {
        return this.productsList
            .filter({ hasText: productName })
            .getByAltText(productName);
    }

    async selectSortByDropdown(label: string) {
        return this.sortSelect.selectOption({ label: label });
    }

    async clickProductName(productName: string) {
        await this.getProductNameLocator(productName).click();
    }

    async clickProductImage(productName: string) {
        await this.getProductImageLocator(productName).click();
    }
}