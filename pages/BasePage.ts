import { type Page, type Locator } from '@playwright/test';

export class BasePage {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    get headerText(): Locator {
        return this.page.getByText('Swag Labs');
    }

    async navigateTo(path: string) {
        await this.page.goto(path);
    }
}