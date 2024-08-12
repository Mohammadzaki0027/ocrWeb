const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");

const vehicleSchema = new mongoose.Schema({
  _id: {
    type: String,
    default: uuidv4,
  },
  vehicleNumber: String,
  driverName: String,
  VehicleRegNumber: String,
  country: String,
  RenewalDate:String,

});

const Vehicle = mongoose.model("Vehicle", vehicleSchema);

module.exports = Vehicle;
