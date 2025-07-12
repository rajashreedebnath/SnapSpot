
const jsonServer = require('json-server');
const path = require('path');

const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults({
  static: 'public',
});

server.use(middlewares);
server.use((req, res, next) => {
  if (req.url.startsWith('/images/')) {
    res.setHeader('Cache-Control', 'public, max-age=31536000');
  }
  next();
});

server.use(router);

server.listen(process.env.PORT || 3001, () => {
  console.log('JSON Server is running');
});