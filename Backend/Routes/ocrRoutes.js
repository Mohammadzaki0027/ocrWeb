const express = require("express");

const router = express.Router();

router.get("ocrweb/:text", async (req, res) => {
  try {
    let text = req.params.text;
    console.log("text", text);
  } catch (error) {}
});

module.exports = router;
