const server = require("./src/server");
require("dotenv").config();
const { conn } = require("./src/db.js");
const DB_connect = require("./src/DB_connect/DB_connect");
const PORT = process.env.SERVER_PORT || 3001;

conn
  .sync({ force: true })
  .then(async () => {
    await DB_connect();
    server.listen(PORT, () => {
      console.log(`♥ Server listening on port: ${PORT} ♥`);
    });
  })
  .catch((error) => console.error(error.message));
