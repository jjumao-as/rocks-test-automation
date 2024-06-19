/**
 * Use Playwright browser context to get at local storage items
 * @param page - The Playwright page object in the test
 * @param valueName - The name of the value to get
 * @param checkCookies - Also look in cookies
 * @returns {Promise<string>}
 */

async function sleep (ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
}
module.exports = {
    sleep
  }