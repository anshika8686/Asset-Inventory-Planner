
const express = require("express");
const cookieParser=require("cookie-parser")
const cors=require("cors")

const app = express();


app.use(express.json());
app.use(cookieParser())
app.use(cors({
  origin: "http://localhost:5173",
  credentials:true
}))

app.get("/", (req, res) => {
  res.send("AssetWise API is running!");
});

const authRouter = require("./routes/auth.routes");
const dashboardRouter=require("./routes/dashboard.routes")
const assetRouter=require("./routes/asset.routes");
const assetConfigrouter=require("./routes/assetConfig.routes")
const AssetInfoRouter=require("./routes/assetInfo.routes");
app.use("/api/auth", authRouter);
app.use("/api/asset",assetRouter);
app.use("/api/config",assetConfigrouter);
app.use("/api/dashboard",dashboardRouter);
app.use("/api",AssetInfoRouter)


module.exports = app;
