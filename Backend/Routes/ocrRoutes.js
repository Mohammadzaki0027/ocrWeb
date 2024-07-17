const express = require("express");
const Vehicle = require("../Schema/userInfoschema");

const router = express.Router();

router.get("/ocrweb/:vehicleNumber", async (req, res) => {
  try {
    const vehicleNumber = req.params.vehicleNumber;

    const vehicle = await Vehicle.findOne({ vehicleNumber });

    if (!vehicle) {
      return res.status(404).json({ error: "Vehicle not found" });
    }

    res.status(200).json(vehicle);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
