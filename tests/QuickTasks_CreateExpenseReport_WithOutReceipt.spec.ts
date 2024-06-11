import { test, expect } from '@playwright/test';

test.beforeEach('Login to portal', async ({ page }) => {
  await page.goto('https://preprod.fullscale.rocks/login');
  await page.getByPlaceholder('Email/User Name').click();
  await page.getByPlaceholder('Email/User Name').fill('malcantara@fullscale.ph');
  await page.getByPlaceholder('Password').click();
  await page.getByPlaceholder('Password').fill('Fu115c@leRocks!');
  await page.getByPlaceholder('Password').click();
  await page.getByRole('button', { name: 'SIGN IN' }).click();
  await page.waitForTimeout(3000);
});

test.afterEach(async ({ page }) => {
  await page.close();
})

test("With No Upload Receipt", async ({ page }) => {
  await expect(page.getByRole('link', { name: ' Create Expense Report' })).toBeVisible();
  await expect(page.locator('#side-navigation')).toContainText('Create Expense Report');
  await page.getByRole('link', { name: ' Create Expense Report' }).click();
  await expect(page.getByRole('heading', { name: 'Submit Expense Report' })).toBeVisible();
  await expect(page.getByRole('heading')).toContainText('Submit Expense Report');
  await page.waitForTimeout(6000);
  await page.getByText('Expense Type', { exact: true }).click();
  await expect(page.getByText('Expense Type', { exact: true })).toBeVisible();
  await expect(page.getByLabel('Expense Type')).toContainText('Please Select Expense Type Equipment Health and Wellness Meal Medical Expense Miscellaneous Office Supplies Shipping and Delivery Expense Team Building Trainings and Seminars Transportation and Travel');
  await page.getByLabel('Expense Type').selectOption('3');
  await expect(page.getByText('Date', { exact: true })).toBeVisible();
  await page.waitForTimeout(3000);
  await expect(page.locator('#fieldset-horizontal')).toContainText('Date');
  await page.waitForTimeout(3000);
  await expect(page.getByRole('textbox', { name: 'Enter Date' })).toBeEmpty();
  await page.getByRole('textbox', { name: 'Enter Date' }).click();
  await page.getByLabel('June 7').click();
  await page.getByText('Receipt Amount').click();
  await expect(page.getByText('Receipt Amount')).toBeVisible();
  await expect(page.locator('#modalDescription')).toContainText('Receipt Amount');
  await expect(page.locator('#select-cash_advance_currency_id')).toContainText('Currency AED AFN ALL AMD ANG AOA ARS AUD AWG AZN BAM BBD BDT BGN BHD BIF BMD BND BOB BRL BSD BTN BWP BYR BZD CAD CDF CHF CKD CLP CNY COP CRC CUP CVE CZK DJF DKK DOP DZD EGP ERN ETB EUR FJD FKP FOK GBP GEL GGP GHS GIP GMD GNF GTQ GYD HKD HNL HRK HTG HUF IDR ILS IMP INR IQD IRR ISK JEP JMD JOD JPY KES KGS KHR KID KMF KPW KRW KWD KYD KZT LAK LBP LKR LRD LSL LYD MAD MDL MGA MKD MMK MNT MOP MRO MUR MVR MWK MXN MYR MZN NAD NGN NIO NOK NPR NZD OMR PAB PEN PGK PHP PKR PLN PYG QAR RON RSD RUB RWF SAR SBD SCR SDG SEK SGD SHP SLL SOS SRD SSP STD SYP SZL THB TJS TMT TND TOP TRY TTD TVD TWD TZS UAH UGX USD UYU UZS VEF VND VUV WST XAF XCD XOF XPF YER ZAR ZMW ZWL');
  await page.getByText('Receipt Amount').click();
  for (let i = 0; i < 2; i++) {
    await page.keyboard.press('Tab');
  }
  await page.keyboard.type("500");
  await expect(page.locator('#modalDescription')).toContainText('Cash Advance Amount');
  await expect(page.locator('#select-cash_advance_currency_id')).toContainText('Currency AED AFN ALL AMD ANG AOA ARS AUD AWG AZN BAM BBD BDT BGN BHD BIF BMD BND BOB BRL BSD BTN BWP BYR BZD CAD CDF CHF CKD CLP CNY COP CRC CUP CVE CZK DJF DKK DOP DZD EGP ERN ETB EUR FJD FKP FOK GBP GEL GGP GHS GIP GMD GNF GTQ GYD HKD HNL HRK HTG HUF IDR ILS IMP INR IQD IRR ISK JEP JMD JOD JPY KES KGS KHR KID KMF KPW KRW KWD KYD KZT LAK LBP LKR LRD LSL LYD MAD MDL MGA MKD MMK MNT MOP MRO MUR MVR MWK MXN MYR MZN NAD NGN NIO NOK NPR NZD OMR PAB PEN PGK PHP PKR PLN PYG QAR RON RSD RUB RWF SAR SBD SCR SDG SEK SGD SHP SLL SOS SRD SSP STD SYP SZL THB TJS TMT TND TOP TRY TTD TVD TWD TZS UAH UGX USD UYU UZS VEF VND VUV WST XAF XCD XOF XPF YER ZAR ZMW ZWL');
  await page.getByText('Cash Advance Amount').click();
  for (let i = 0; i < 2; i++) {
    await page.keyboard.press('Tab');
  }
  await page.keyboard.type("800");
  await expect(page.locator('#modalDescription')).toContainText('Reimbursable Amount');
  await expect(page.locator('#select-reimbursable_currency_id')).toContainText('Currency AED AFN ALL AMD ANG AOA ARS AUD AWG AZN BAM BBD BDT BGN BHD BIF BMD BND BOB BRL BSD BTN BWP BYR BZD CAD CDF CHF CKD CLP CNY COP CRC CUP CVE CZK DJF DKK DOP DZD EGP ERN ETB EUR FJD FKP FOK GBP GEL GGP GHS GIP GMD GNF GTQ GYD HKD HNL HRK HTG HUF IDR ILS IMP INR IQD IRR ISK JEP JMD JOD JPY KES KGS KHR KID KMF KPW KRW KWD KYD KZT LAK LBP LKR LRD LSL LYD MAD MDL MGA MKD MMK MNT MOP MRO MUR MVR MWK MXN MYR MZN NAD NGN NIO NOK NPR NZD OMR PAB PEN PGK PHP PKR PLN PYG QAR RON RSD RUB RWF SAR SBD SCR SDG SEK SGD SHP SLL SOS SRD SSP STD SYP SZL THB TJS TMT TND TOP TRY TTD TVD TWD TZS UAH UGX USD UYU UZS VEF VND VUV WST XAF XCD XOF XPF YER ZAR ZMW ZWL');
  await page.getByText('Reimbursable Amount').click();
  for (let i = 0; i < 2; i++) {
    await page.keyboard.press('Tab');
  }
  await page.keyboard.type("100");
  await page.getByText('Justification').click();
  await expect(page.getByLabel('Justification')).toBeEmpty();
  await page.getByLabel('Justification').click();
  await page.getByLabel('Justification').fill('This is a sample message.');
  await expect(page.getByText('No', { exact: true })).toBeVisible();
  await expect(page.locator('#modalDescription')).toContainText('No');
  await expect(page.getByText('Receipt Missing?')).toBeVisible();
  await expect(page.locator('#modalDescription')).toContainText('Receipt Missing?');
  await page.locator('label').filter({ hasText: 'Yes No' }).locator('span').nth(1).click();
  await page.getByText('SUBMIT', { exact: true }).click();
  await expect(page.locator('.swal2-success-ring')).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Great!' })).toBeVisible();
  await expect(page.locator('#swal2-title')).toContainText('Great!');
  await expect(page.getByText('We will review your report')).toBeVisible();
  await expect(page.locator('#swal2-content')).toContainText('We will review your report and send an email once status is updated.');
  await expect(page.getByRole('button', { name: 'OK' })).toBeVisible();
  await expect(page.getByRole('button')).toContainText('OK');
  await page.getByRole('button', { name: 'OK' }).click();
});