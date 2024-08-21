const { faker } = require('@faker-js/faker/locale/en_US')
const tz = require('../tests/config/timezones.js')
const fs = require('fs');
const path = require('path');
const dataPath = path.join(__dirname, '../testdata/myProfile.json');
/**
 * @returns {{firstName: string, lastName: string}}
 */
function firstAndLastName() {
  return {
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName()
  }
}
/**
* @returns {{firstName: string, lastName: string, preferredContactMethod: string, phone: string, email: string}}
*/
function fullContactData(contactData = {}, nameSuffix) {
  if (typeof contactData === 'string') {
    nameSuffix = contactData
    contactData = {}
  }
  const firstName = contactData.firstName || faker.person.firstName()
  const lastName = `${contactData.lastName || faker.person.lastName()}${nameSuffix || ''}`
  const alphanumeric = () => faker.string.alphanumeric(1);
  const digits = (count) => faker.string.numeric(count);
  const phoneNumber = `${alphanumeric()}${digits(2)}${alphanumeric()}${digits(6)}`;
  return {
    firstName,
    lastName,
    email: faker.internet.email({ firstName, lastName }),
    phoneNumber,
  }
}
function getRandomTimezone() {
  return faker.helpers.arrayElement(tz.TIMEZONE)
}

function savedContact() {
  let existingData = { contacts : []};

  if (fs.existsSync(dataPath)) {
    const rawData = fs.readFileSync(dataPath, 'utf8');
    existingData = JSON.parse(rawData);

    // Ensure contacts is an array
    if (!Array.isArray(existingData.contacts)) {
      existingData.contacts = [];
    }
  }

  existingData.contacts=fullContactData();

  // Convert updated data to JSON format
  const updatedJsonData = JSON.stringify(existingData, null, 2);

  // Write updated JSON data to file
  fs.writeFileSync(dataPath, updatedJsonData, 'utf8');
}
module.exports = {
  firstAndLastName,
  fullContactData,
  getRandomTimezone,
  savedContact
}