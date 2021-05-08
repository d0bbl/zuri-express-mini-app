
// console.log(port);
// const port = process.env.PORT || 80;

const http = require('http');
const {app, port} = require('./app');

const server = http.createServer(app);

server.listen(port, () => {
  console.log(`App running on port ${port}`);
});
