const express = require("express");
const Vehicle = require("../Schema/userInfoschema");

const router = express.Router();

router.post("/adduserInfo", async (req, res) => {

  try {
    const { vehicleNumber, driverName, VehicleRegNumber, country } = req.body;

 
    const newVehicle = new Vehicle({
      vehicleNumber,
      driverName,
      VehicleRegNumber,
      country,
    });

    await newVehicle.save();

    res.status(201).json(newVehicle);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
