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
    async addToCart(productName: string) {
        await this.productsList.filter({ hasText: productName })
            .getByRole('button', { name: 'Add to cart' })
            .click();
    }

    async getCartCount() {
        return await this.shoppingCartLink.textContent();
    }
}