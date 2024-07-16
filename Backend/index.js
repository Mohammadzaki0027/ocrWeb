const express = require("express");
const { connection } = require("./config/db");
require("dotenv").config();
const port = process.env.PORT;

const app = express();
app.get("/", (req, res) => {
  res.send("Hello World!");
});


app.listen(port, async () => {
  try {
    await connection;
    console.log("Listening on the Port", port);
  } catch (error) {
    console.log(error, "error");
  }
});
