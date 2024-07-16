// routes/ocr.js

const express = require('express');
const vision = require('@google-cloud/vision');
const router = express.Router();

// Creates a client
const client = new vision.ImageAnnotatorClient();

router.post('/ocr', async (req, res) => {
  try {
    const { image } = req.body;
    const [result] = await client.textDetection({
      image: { content: image },
    });
    const detections = result.textAnnotations;
    console.log('Text:', detections);
    const numbers = detections[0]?.description.match(/\d+/g) || [];
    res.json({ numbers });
  } catch (error) {
    console.error('ERROR:', error);
    res.status(500).send('Error processing image');
  }
})

module.exports = router;