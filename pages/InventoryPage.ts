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

    // Methods
    addToCart(productName: string) {
        this.productsList.filter({ hasText: productName })
    }
}