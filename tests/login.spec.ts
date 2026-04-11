import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import * as testData from './data/testData.json';

// Override the global storageState for this file
test.use({ storageState: { cookies: [], origins: [] } });

test.describe('Login - Negative scenarios', () => {
    test('Locked user should not be able to login', async ({ page }) => {
        const loginPage = new LoginPage(page);

        await loginPage.navigateTo('/');
        await expect(loginPage.headerText).toBeVisible();
        await loginPage.login(testData.users.locked.username, testData.users.locked.password);

        await expect(loginPage.errorMsg).toHaveText('Epic sadface: Sorry, this user has been locked out.');
    });

    test('Incorrect username password', async ({ page }) => {
        const loginPage = new LoginPage(page);

        await loginPage.navigateTo('/');
        await expect(loginPage.headerText).toBeVisible();
        await loginPage.login(testData.users.invalid.username, testData.users.invalid.password);

        await expect(loginPage.errorMsg).toHaveText('Epic sadface: Username and password do not match any user in this service');
    });

    test('logout successfully', async ({ page }) => {
        const loginPage = new LoginPage(page);

        await loginPage.navigateTo('/');
        await expect(loginPage.headerText).toBeVisible();
        await loginPage.login(testData.users.standard.username, testData.users.standard.password);
        await expect(page).toHaveURL(/inventory/);
        await loginPage.clickMenuButton();
        await loginPage.clickLogoutButton();
        await expect(page).toHaveURL('/');
    })
});