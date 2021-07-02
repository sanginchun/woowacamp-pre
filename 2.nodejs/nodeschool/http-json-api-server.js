const http = require('http');

const ISO_STRING_LENGTH = 24;

http
  .createServer(function (request, response) {
    if (request.method === 'GET') {
      const parsedUrl = new URL(request.url, 'http://sample.com');
      const dateString = parsedUrl.searchParams.get('iso');

      if (dateString == null || dateString.length !== ISO_STRING_LENGTH) {
        response.writeHead(400, { 'Content-Type': 'text/plain' });
        return response.end('Invalid query params');
      }

      const dateObject = new Date(dateString);
      let result = '';

      switch (parsedUrl.pathname) {
        case '/api/parsetime':
          result = JSON.stringify({
            hour: dateObject.getHours(),
            minute: dateObject.getMinutes(),
            second: dateObject.getSeconds(),
          });
          break;
        case '/api/unixtime':
          result = JSON.stringify({
            unixtime: dateObject.getTime(),
          });
          break;
        default:
          response.writeHead(404, { 'Content-Type': 'text/plain' });
          return response.end('Unknown endpoint');
      }

      response.writeHead(200, { 'Content-Type': 'application/json' });
      response.end(result);
    }
  })
  .listen(process.argv[2]);
