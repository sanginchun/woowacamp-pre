const filteredLs = require('./mymodule.js');

const dirPath = process.argv[2];
const extension = process.argv[3];

filteredLs(dirPath, extension, function (err, filteredFiles) {
  if (err) return console.error(err);

  console.log(filteredFiles.join('\n'));
});
