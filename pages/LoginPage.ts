import { type Locator, type Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class LoginPage extends BasePage {
    constructor(page: Page) {
        super(page);
    }

    // Getter Locators
    get usernameInput(): Locator {
        return this.page.getByPlaceholder('Username');
    }

    get passwordInput(): Locator {
        return this.page.getByPlaceholder('Password');
    }

    get loginButton(): Locator {
        return this.page.getByRole('button', { name: 'Login' });
    }

    get errorMsg(): Locator {
        return this.page.locator('[data-test="error"]');
    }

    // Methods
    async login(username: string, password: string) {
        await this.usernameInput.fill(username);
        await this.passwordInput.fill(password);
        await this.loginButton.click();
    }
}