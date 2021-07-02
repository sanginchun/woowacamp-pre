const net = require('net');

const server = net.createServer(function (socket) {
  socket.end(getLocalDateTimeString());
});

server.listen(process.argv[2]);

function getLocalDateTimeString(dateObject = new Date()) {
  const year = dateObject.getFullYear();
  const month = (dateObject.getMonth() + 1).toString().padStart(2, '0');
  const date = dateObject.getDate().toString().padStart(2, '0');
  const hours = dateObject.getHours();
  const minutes = dateObject.getMinutes();

  return `${year}-${month}-${date} ${hours}:${minutes}\n`;
}
