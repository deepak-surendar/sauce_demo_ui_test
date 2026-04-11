import { test as setup, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import path from 'path';

const authFile = path.join(__dirname, '../../playwright/.auth/user.json');

setup('authenticate', async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.navigateTo('/');
  await expect(loginPage.headerText).toBeVisible();

  await loginPage.login('standard_user', 'secret_sauce');
  await expect(page).toHaveURL(/inventory/);
  
  await page.context().storageState({ path: authFile });
});

