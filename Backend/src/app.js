
const express = require("express");
const cookieParser=require("cookie-parser")
const app = express();


app.use(express.json());
app.use(cookieParser())

app.get("/", (req, res) => {
  res.send("AssetWise API is running!");
});

const authRouter = require("./routes/auth.routes");
const assetRouter=require("./routes/asset.routes");
const assetConfigrouter=require("./routes/assetConfig.routes")
app.use("/api/auth", authRouter);
app.use("/api/asset",assetRouter);
app.use("/api/config",assetConfigrouter)

module.exports = app;
