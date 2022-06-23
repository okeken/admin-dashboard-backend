const path = require("path");
const jsonServer = require("json-server");
const auth = require("json-server-auth");

const server = jsonServer.create();
const router = jsonServer.router(path.join(__dirname, "db.json"));
server.db = router.db;
const middlewares = jsonServer.defaults();

server.use(middlewares);

const rules = auth.rewriter({
  // Permission rules
  products: 660,
  brands: 440,
});

// You must apply the middlewares in the following order
const port = process.env.PORT || 5000;
server.use(rules);
server.use(auth);
server.use(router);
server.listen(port, () => {
  console.log("JSON Server is running on port " + port);
});

// Export the Express API
module.exports = server;
