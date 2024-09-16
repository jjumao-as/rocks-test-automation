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

function updateJsonData(file, propertyPath, newValue) {
    const absolutePath =  path.join(__dirname, '../testdata/'+file+'.json');
    let jsonData = JSON.parse(fs.readFileSync(absolutePath, 'utf8'));

    const setValueAtPath = (obj, path, value) => {
        const keys = path.split('>');
        let lastKey = keys.pop();
        const lastObj = keys.reduce((acc, key) => acc[key] = acc[key] || {}, obj);
        lastObj[lastKey] = value;
    };

    setValueAtPath(jsonData, propertyPath, newValue);

    fs.writeFileSync(absolutePath, JSON.stringify(jsonData, null, 2), 'utf8');
}

module.exports = { readJsonFile, updateJsonData };