const fs = require('fs');
const path = require('path');

const dirPath = process.argv[2];
const extension = '.' + process.argv[3];

fs.readdir(dirPath, function (err, fileNames) {
  if (err) {
    return console.error(err);
  }

  console.log(
    fileNames
      .filter((fileName) => path.extname(fileName) === extension)
      .join('\n')
  );
});
