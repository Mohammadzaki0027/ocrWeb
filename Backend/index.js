const express = require("express");
require("dotenv").config();
const bodyParser = require('body-parser');
const vision = require('@google-cloud/vision');
const { connection } = require("./config/db");
const ocrRoute =require("./Routes/ocrRoutes")
const port = process.env.PORT;
const app = express();
app.use("/", ocrRoute);
app.use('/api', ocrRoute);
app.use(bodyParser.json({ limit: '10mb' }));

const client = new vision.ImageAnnotatorClient();

app.listen(port, async () => {
  try {
    await connection;
    console.log("Listening on the Port", port);
  } catch (error) {
    console.log(error, "error");
  }
});
