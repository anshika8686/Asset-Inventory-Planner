
const express = require("express");
const app = express();

app.use(express.json());
console.log("Express app created:", typeof app.listen);

app.get("/", (req, res) => {
  res.send("AssetWise API is running!");
});

const authRouter = require("./routes/auth.routes");
app.use("/api/auth", authRouter);

module.exports = app;
