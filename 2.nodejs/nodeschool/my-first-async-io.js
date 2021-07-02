const fs = require('fs');

const filePath = process.argv[2];

fs.readFile(filePath, 'utf-8', function (err, fileContent) {
  if (err) {
    console.error(err);
    return;
  }

  const lines = fileContent.split('\n').length - 1;
  console.log(lines);
});
