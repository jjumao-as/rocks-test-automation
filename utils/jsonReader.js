const fs = require('fs');
const path = require('path');

function readJsonFile(filePath) {
    const resolvedPath = path.resolve(__dirname, '../testdata/' + filePath + '.json');

    if (fs.existsSync(resolvedPath)) {
        try {
            const rawData = fs.readFileSync(resolvedPath, 'utf8');
            return JSON.parse(rawData);
        } catch (error) {
            throw new Error(`Error parsing JSON from file ${filePath}: ${error.message}`);
        }
    } else {
        throw new Error(`File ${filePath} not found`);
    }
}

module.exports = { readJsonFile };