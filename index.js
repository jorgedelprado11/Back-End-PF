const server = require("./src/server");
require("dotenv").config();
const { conn } = require("./src/db.js");
require("dotenv").config();
const DB_connect = require("./src/DB_connect/DB_connect");
const PORT = process.env.PORT || 3001;
conn
  .sync({ force: false })
  .then(async () => {
    await DB_connect();
    server.listen(PORT, "0.0.0.0", () => {
      console.log(`♥ Server listening on port: ${PORT} ♥`);
    });
  })
  .catch((error) => console.error(error.message));
