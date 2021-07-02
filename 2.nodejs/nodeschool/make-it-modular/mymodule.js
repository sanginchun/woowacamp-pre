const fs = require('fs');
const path = require('path');

module.exports = function (dirName, extension, callback) {
  fs.readdir(dirName, function (err, fileNames) {
    if (err) return callback(err);

    callback(
      null,
      fileNames.filter((fileName) => path.extname(fileName) === '.' + extension)
    );
  });
};
