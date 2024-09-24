import { test } from '@playwright/test';
const { getLatestEmail } = require('../utils/zohoDriver.js')

test('test Zoho123', async() => {
    await getLatestEmail('Ann Pastoriza has share', 'notify@zohoworkdrive.com');
})