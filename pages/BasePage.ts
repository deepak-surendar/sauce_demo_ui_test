import { type Page, type Locator } from '@playwright/test';

export class BasePage {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    // Getter methods
    get headerText(): Locator {
        return this.page.getByText('Swag Labs');
    }

    get shoppingCartLink(): Locator {
        return this.page.locator('a[data-test="shopping-cart-link"]');
    }

    get menuButton(): Locator {
        return this.page.locator('#react-burger-menu-btn');
    }

    async navigateTo(path: string) {
        await this.page.goto(path);
    }
}