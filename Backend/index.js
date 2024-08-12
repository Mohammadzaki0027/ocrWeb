const express = require("express");
require("dotenv").config();

const { connection } = require("./config/db");
const ocrRoute =require("./Routes/ocrRoutes")
const userInfoRoute=require("./Routes/uerInfoRoutes")
const port = process.env.PORT;
const app = express();
const cors = require('cors');
app.use(cors());
app.use(express.json());

app.use('/getapi', ocrRoute);
app.use("/",userInfoRoute)

app.listen(port, async () => {
  try {
    await connection;
    console.log("Listening on the Port", port);
  } catch (error) {
    console.log(error, "error");
  }
});
