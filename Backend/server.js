
require("dotenv").config();

const app = require("./src/app");
const connectToDb = require("./src/config/db");

const PORT = 4000;

async function startServer() {
  try {
    await connectToDb();

    const server = app.listen(PORT, () => {
      console.log("Server is listening!");
    });

    server.on("error", (error) => {
      console.error("SERVER ERROR:", error);
    });

  } catch (error) {
    console.error("STARTUP ERROR:", error);
  }
}

startServer();
