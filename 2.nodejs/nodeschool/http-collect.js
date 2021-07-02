const http = require('http');

http
  .get(process.argv[2], function (response) {
    let collect = '';

    response.setEncoding('utf-8');
    response.on('data', (chunk) => (collect += chunk));
    response.on('error', console.error);
    response.on('end', () => {
      console.log(collect.length);
      console.log(collect);
    });
  })
  .on('error', console.error);
