import { test, expect } from '@playwright/test';

test.beforeEach('Find Talent', async ({ page }) => {
  await page.goto('https://preprod.fullscale.rocks/login');
  await page.getByPlaceholder('Email/User Name').click();
  await page.getByPlaceholder('Email/User Name').fill('automationtestemail7@gmail.com');
  await page.getByPlaceholder('Password').click();
  await page.getByPlaceholder('Password').fill('111111Aa');
  await page.getByPlaceholder('Password').click();
  await page.getByRole('button', { name: 'SIGN IN' }).click();
  await page.waitForTimeout(3000);
});
test('Talent with skill that is set as show in Profile and is Searchable will be displayed on the search result', async ({ page }) => {
  await page.getByRole('link', { name: ' Find Talent' }).click();
  await page.getByPlaceholder('Enter a skill, language, or').click();
  await page.getByPlaceholder('Enter a skill, language, or').fill('Repo Hosting Services');
  await page.getByPlaceholder('Enter a skill, language, or').press('Enter');
  await expect(page.getByRole('link', { name: 'Test Employee A', exact: true })).toBeVisible();
  await expect(page.locator('span').filter({ hasText: 'Conflict Management' }).first()).toBeVisible();
  await expect(page.locator('span').filter({ hasText: 'Repo Hosting Services' }).first()).toBeVisible();
  await expect(page.locator('span').filter({ hasText: 'Personnel Management' }).first()).toBeHidden();
  await expect(page.locator('span').filter({ hasText: 'Project Team Leadership' }).nth(2)).toBeHidden();
  
});
test('Talent with skill that is set as show in Profile and is Not Searchable will not be displayed', async ({ page }) => {
  await page.getByRole('link', { name: ' Find Talent' }).click();
  await page.getByPlaceholder('Enter a skill, language, or').click();
  await page.getByPlaceholder('Enter a skill, language, or').fill('Conflict Management');
  await page.getByPlaceholder('Enter a skill, language, or').press('Enter');
  await expect(page.getByRole('link', { name: 'Test Employee A', exact: true })).toBeHidden();
});
test('Talent with skill that is set as not show in Profile and is Searchable will not be displayed', async ({ page }) => {
  await page.getByRole('link', { name: ' Find Talent' }).click();
  await page.getByPlaceholder('Enter a skill, language, or').click();
  await page.getByPlaceholder('Enter a skill, language, or').fill('Personnel Management');
  await page.getByPlaceholder('Enter a skill, language, or').press('Enter');
  await expect(page.getByRole('link', { name: 'Test Employee A', exact: true })).toBeHidden();
});
test('Talent with skill that is set as not show in Profile and us Searchable will not be displayed', async ({ page }) => {
  await page.getByRole('link', { name: ' Find Talent' }).click();
  await page.getByPlaceholder('Enter a skill, language, or').click();
  await page.getByPlaceholder('Enter a skill, language, or').fill('Project Team Leadership');
  await page.getByPlaceholder('Enter a skill, language, or').press('Enter');
  await expect(page.getByRole('link', { name: 'Test Employee A', exact: true })).toBeVisible();
});
test('Smart search works in about me section', async ({ page }) => {
  await page.getByRole('link', { name: ' Find Talent' }).click();
  await page.getByPlaceholder('Enter a skill, language, or').click();
  await page.getByPlaceholder('Enter a skill, language, or').fill('AI-driven platform');
  await page.getByPlaceholder('Enter a skill, language, or').press('Enter');
  await expect(page.getByRole('link', { name: 'Test Employee A', exact: true })).toBeVisible();
});
test('Smart search works in work Experience Section', async ({ page }) => {
  await page.getByRole('link', { name: ' Find Talent' }).click();
  await page.getByPlaceholder('Enter a skill, language, or').click();
  await page.getByPlaceholder('Enter a skill, language, or').fill('Freelancers handle');
  await page.getByPlaceholder('Enter a skill, language, or').press('Enter');
  await expect(page.getByRole('link', { name: 'Test Employee A', exact: true })).toBeVisible();
});