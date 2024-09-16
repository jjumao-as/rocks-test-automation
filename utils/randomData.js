const { faker } = require('@faker-js/faker/locale/en_US')
const fs = require('fs');
const path = require('path');
const { readJsonFile } = require('../utils/jsonReader');
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
    phoneNumber,
  }
}
function getRandomTimezone() {
  testDataPath = 'timeZone';
  tz = readJsonFile(testDataPath);
  return faker.helpers.arrayElement(tz.timeZone)
}

function savedContact(fileData) {
  let existingData = { contacts : [], employeeName : []};
  const filePath = path.join(__dirname, '../testdata/'+fileData+'.json');

  if (fs.existsSync(filePath)) {
    const rawData = fs.readFileSync(filePath, 'utf8');
    existingData = JSON.parse(rawData);

    // Ensure contacts is an array
    if (!Array.isArray(existingData.contacts)) {
      existingData.contacts = [];
    }

    // Ensure contacts is an array
    if (!Array.isArray(existingData.employee)) {
      existingData.employeeName = [];
    }
  }

  existingData.contacts=fullContactData();
  existingData.employeeName=firstAndLastName();

  // Convert updated data to JSON format
  const updatedJsonData = JSON.stringify(existingData, null, 2);

  // Write updated JSON data to file
  fs.writeFileSync(filePath, updatedJsonData, 'utf8');
}
module.exports = {
  firstAndLastName,
  fullContactData,
  getRandomTimezone,
  savedContact
}