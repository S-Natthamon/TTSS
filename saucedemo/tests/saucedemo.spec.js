const {test, expect} = require('@playwright/test');

test('Shopping saucedemo.com', async ({ page }) => {
    //1. Login with username/password saucedemo
    await page.goto('https://www.saucedemo.com/')
    await expect(page.locator('.login_logo')).toHaveText('Swag Labs')
    await page.getByPlaceholder('Username').fill('standard_user')
    await page.locator('#password[placeholder="Password"]').fill('secret_sauce')
    await page.locator('#login-button[name="login-button"]').click()
    await expect(page.locator('.header_secondary_container')).toContainText('Products')

    //2.Shopping Add to cart T-Shirt, flashlight and Backpack 
    await page.locator('button[name="add-to-cart-sauce-labs-bolt-t-shirt"]').click()
    await page.locator('button[name="add-to-cart-test.allthethings()-t-shirt-(red)"]').click()
    await page.locator('button[data-test="add-to-cart-sauce-labs-backpack"]').click()

    await expect(page.locator('span[data-test="shopping-cart-badge"]')).toContainText('3')
    await page.locator('#shopping_cart_container').click()
    await expect(page.locator('.app_logo')).toContainText('Swag Labs')

    //3.Remove product Backpack before click Checkout 
    await page.locator('button[data-test="remove-sauce-labs-backpack"]').click()
    await expect(page.locator('span[data-test="shopping-cart-badge"]')).toContainText('2')
    await page.locator('#checkout').click()

    //4.Please enter firstName, lastName and Zip after that Continue click
    await expect(page.locator('div[data-test="secondary-header"]')).toHaveText('Checkout: Your Information')

    await page.getByPlaceholder('First Name').fill('Beer')
    await page.getByPlaceholder('Last Name').fill('Test')
    await page.locator('input[data-test="postalCode"]').fill('11000')
    await page.locator('#continue').click()

    //5.Verify price total after that Finish click 
    await page.locator('#finish').click()

    //6.Verify shopping success will be Thank you for your order! page 
    await expect(page.locator('div[data-test="secondary-header"]')).toContainText('Checkout')
    await expect(page.locator('h2[data-test="complete-header"]')).toHaveText('Thank you for your order!')
})

