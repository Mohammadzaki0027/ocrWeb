const express = require("express");
const Vehicle = require("../Schema/userInfoschema");
const stringSimilarity = require("string-similarity");
const router = express.Router();

router.get("/ocrweb/:vehicleNumber", async (req, res) => {
  try {
    const vehicleNumber = req.params.vehicleNumber;

    const vehicle = await Vehicle.find();
    const searchVehicleNumber = vehicleNumber;

    const vehicleNumbers = vehicle.map((vehicle) => vehicle.vehicleNumber);

    const bestMatchResult = stringSimilarity.findBestMatch(
      searchVehicleNumber,
      vehicleNumbers
    );

    const bestMatchVehicle = vehicle.find(
      (vehicle) => vehicle.vehicleNumber === bestMatchResult.bestMatch.target
    );

    console.log("Best Match Result:", bestMatchResult);
    console.log("Best Match Vehicle:", bestMatchVehicle);

    if (!Object.keys(bestMatchResult).length) {
      return res.status(404).json({ error: "Vehicle not found" });
    }
    res.status(200).json(bestMatchVehicle);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
