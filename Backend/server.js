
const express = require("express");
const connectDB = require("./src/config/db");
require("dotenv").config();
connectDB();


const app = express();

// Middleware
app.use(express.json());

// Test route
app.get("/", (req, res) => {
  res.send("AssetWise API is running!");
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
