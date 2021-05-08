const http = require('http');
const {app, localPort} = require('./app');

const port = process.env.PORT || localPort;

const server = http.createServer(app);

server.listen(port, () => {
  console.log(`App running on port ${port}`);
});
