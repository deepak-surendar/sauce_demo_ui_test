import {type Locator, type Page} from '@playwright/test';
import { BasePage } from './BasePage';

export class ProductDetailsPage extends BasePage {
    constructor(page: Page) {
        super(page);
    }

    // Getter Locators
    get productName(): Locator {
        return this.page.locator('[data-test="inventory-item-name"]');
    }

    get productDescription(): Locator {
        return this.page.locator('[data-test="inventory-item-desc"]');
    }

    get productPrice(): Locator {
        return this.page.locator('[data-test="inventory-item-price"]');
    }

    get backToProductsButton(): Locator {
        return this.page.getByRole('button', { name: 'Back to products'});
    }

    // Methods
    async clickBackToProductsButton() {
        await this.backToProductsButton.click();
    }
}