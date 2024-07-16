const express = require("express");
require("dotenv").config();

const { connection } = require("./config/db");
const ocrRoute =require("./Routes/ocrRoutes")
const port = process.env.PORT;
const app = express();
app.use("/", ocrRoute);
app.use('/api', ocrRoute);


app.listen(port, async () => {
  try {
    await connection;
    console.log("Listening on the Port", port);
  } catch (error) {
    console.log(error, "error");
  }
});
