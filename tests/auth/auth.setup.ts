import { test as setup, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { InventoryPage  } from '../../pages/InventoryPage';
import path from 'path';

const authFile = path.join(__dirname, '../../playwright/.auth/user.json');
console.log(authFile);

setup('authenticate', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const inventoryPage = new InventoryPage(page);

  await loginPage.navigateTo('/');
  await expect(loginPage.headerText).toBeVisible();

  await loginPage.login('standard_user', 'secret_sauce');
  await expect(inventoryPage.headerText).toBeVisible();
  await expect(inventoryPage.secondaryHeaderText).toBeVisible();
  
  await page.context().storageState({ path: authFile });
});

