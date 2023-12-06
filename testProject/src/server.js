const express = require("express");
const cors = require("cors");
const modules = require("./modules/app.module.js");
const app = express();

app.use(cors({ origin: "*" }));
app.use(express.json());

app.use("/api", modules.router);

const port = 7777;

app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});
