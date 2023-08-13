const express = require("express");
const cors = require("cors");
const http = require("http");

const app = express();
app.use(express.json());
app.use(cors());

app.listen(6000, () => {
  console.log("running");
});
