const http = require('http');
const fs = require('fs');

const portNumber = process.argv[2];
const filePath = process.argv[3];

http
  .createServer(function (request, response) {
    response.writeHead(200, { 'Content-Type': 'text/plain' });

    fs.createReadStream(filePath).pipe(response);
  })
  .listen(portNumber);
