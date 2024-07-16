const { faker } = require('@faker-js/faker/locale/en_US')
const tz = require('../tests/config/timezones.js')
/**
 * @returns {{firstName: string, lastName: string}}
 */
function firstAndLastName () {
    return {
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName()
    }
  }
  /**
 * @returns {{firstName: string, lastName: string, preferredContactMethod: string, phone: string, email: string}}
 */
function fullContactData (contactData = {}, nameSuffix) {
    if (typeof contactData === 'string') {
      nameSuffix = contactData
      contactData = {}
    }
    const firstName = contactData.firstName || faker.person.firstName()
    const lastName = `${contactData.lastName || faker.person.lastName()}${nameSuffix || ''}`
    return {
      firstName,
      lastName,
      email: faker.internet.email(firstName, lastName),
      phone: faker.phone.number('!##!######'),
    }
  }
  function getRandomTimezone () {
    return faker.helpers.arrayElement(tz.TIMEZONE)
  }
  module.exports = {
    firstAndLastName,
    fullContactData,
    getRandomTimezone
  }