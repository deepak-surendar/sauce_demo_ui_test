import { test, expect } from '@playwright/test';
import { InventoryPage  } from '../pages/InventoryPage';

test('check products list count', async({page}) => {
    const inventoryPage = new InventoryPage(page);
    
      await inventoryPage.navigateTo('/inventory.html');
      console.log(await inventoryPage.productsList.allTextContents());
      expect(await inventoryPage.productsList.count()).toEqual(6);
})