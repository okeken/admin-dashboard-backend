const path = require("path");
const jsonServer = require("json-server");
const auth = require("json-server-auth");

const server = jsonServer.create();
const router = jsonServer.router(path.join(__dirname, "db.json"));
server.db = router.db;
const middlewares = jsonServer.defaults();


server.use(middlewares);
server.use(auth);
server.use(router);
server.listen(5000, () => {
  console.log("JSON Server is running");
});
