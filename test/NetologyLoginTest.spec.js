const { test, expect } = require("@playwright/test");
const { email, password } = require("../user.js");

test.use({ headless: false });

test.describe("netology.ru login", () => {
  test("test1", async ({ page }) => {
    await page.goto("https://netology.ru/");
    await page.click("text=Войти");
    await page.pause();
    const inputEmailField = await page.$('input[name = "email"]');
    await inputEmailField.fill(email);
    const inputPasswordField = await page.$('input[name = "password"]');
    await inputPasswordField.fill(password);
    await page.screenshot({ path: "loginPage.png", fullPage: true });
    await page.click("text=Войти");
    const locator = await page.locator("h2");
    await expect(locator).toHaveText("Мои курсы и профессии");
    await page.screenshot({ path: "profile.png", fullPage: true });
  });

  test("test2", async ({ page }) => {
    await page.goto("https://netology.ru/");
    await page.click("text=Войти");
    await page.pause();
    const inputEmailField = await page.$('input[name = "email"]');
    await inputEmailField.fill("email@email.ru");
    const inputPasswordField = await page.$('input[name = "password"]');
    await inputPasswordField.fill("password");
    await page.screenshot({ path: "loginPage2.png", fullPage: true });
    await page.click("text=Войти");
    const locator = await page.locator("Вы ввели неправильно логин или пароль");
    await expect(locator).toBeVisible;
    await page.screenshot({ path: "error.png", fullPage: true });
  });
});
