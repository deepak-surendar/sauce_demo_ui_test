import { type Locator, type Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class CartPage extends BasePage {
    constructor(page: Page) {
        super(page);
    }

    // Getters
    // 'Your Cart' header text
    get secondaryHeaderText(): Locator {
        return this.page.locator('[data-test="title"]');
    }

    // fetches all items in the cart
    get cartList(): Locator {
        return this.page.locator('[data-test="item-quantity"]');
    }

    // Methods
    async getItemQuantity(productName: string) {
        this.cartList.filter({ hasText: productName })
            .locator('[data-test="item-quantity"]')
    }

    getItemQuantityLocator(productName: string) {
        return this.cartList
            .filter({ hasText: productName })
            .locator('[data-test="item-quantity"]');
    }

    getCartItemNameLocator(productName: string): Locator {
        return this.cartList
            .filter({ hasText: productName })
            .locator('[data-test="inventory-item-name"]');
    }

    getCartItemDescLocator(productName: string): Locator {
        return this.cartList
            .filter({ hasText: productName })
            .locator('[data-test="inventory-item-desc"]');
    }

    getCartItemPriceLocator(productName: string): Locator {
        return this.cartList
            .filter({ hasText: productName })
            .locator('[data-test="inventory-item-price"]');
    }

}