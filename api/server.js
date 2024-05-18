const jsonServer = require('json-server');
const cors = require('cors');
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();

// CORS configuration
const corsOptions = {
  origin: 'www.listenit-music-player.netlify.app',
  methods: 'GET,OPTIONS,PATCH,DELETE,POST,PUT',
  allowedHeaders: ['Content-Type', 'Authorization', 'X-CSRF-Token', 'X-Requested-With', 'Accept', 'Accept-Version', 'Content-Length', 'Content-MD5', 'Date', 'X-Api-Version'],
  credentials: true,
};

// Use middlewares
server.use(middlewares);

// Add CORS middleware
server.use(cors(corsOptions));

// Rewriter middleware
server.use(jsonServer.rewriter({
  '/api/*': '/$1',
  '/product/:resource/:id/show': '/:resource/:id'
}));

// Use router middleware
server.use(router);

server.listen(3000, () => {
  console.log('JSON Server is running');
});

// Export the Server API
module.exports = server;
