const http = require('http');

const urls = process.argv.slice(2);
const results = new Array(urls.length).fill('');
let resultCount = 0;

urls.forEach((URL, index) => {
  http
    .get(URL, (response) => {
      response.setEncoding('utf-8');

      response.on('data', (chunk) => (results[index] += chunk));
      response.on('end', () => {
        resultCount++;
        if (resultCount === urls.length) console.log(results.join('\n'));
      });
      response.on('error', console.error);
    })
    .on('error', console.error);
});
