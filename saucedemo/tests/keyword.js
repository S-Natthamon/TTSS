
const [authLoginPage] = await Promise.all(
    [
        page.goto('https://www.saucedemo.com/'),
         expect(page.locator('.login_logo')).toHaveText('Swag Labs'),
         page.getByPlaceholder('Username').fill('standard_user'),
         page.locator('#password[placeholder="Password"]').fill('secret_sauce'),
         page.locator('#login-button[name="login-button"]').click(),
         expect(page.locator('.header_secondary_container')).toContainText('Products'),
    ]
)
