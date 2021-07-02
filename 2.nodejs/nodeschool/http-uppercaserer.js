const http = require('http');

const portNumber = process.argv[2];

http
  .createServer(function (request, response) {
    if (request.method !== 'POST') return response.end('Not POST\n');

    let data = '';

    request.on('data', (chunk) => (data += chunk));
    request.on('end', () => {
      response.end(data.toUpperCase());
    });
  })
  .listen(portNumber);
