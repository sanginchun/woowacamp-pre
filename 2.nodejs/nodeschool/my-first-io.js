const fs = require('fs');

const filePath = process.argv[2];
const fileContent = fs.readFileSync(filePath, 'utf-8');

console.log(fileContent.split('\n').length - 1);
