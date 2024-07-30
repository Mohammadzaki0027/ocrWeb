

const mongoose = require('mongoose');
main()
.then(() => {
    console.log("connection successful");
})
.catch(err => console.log(err));

async function main() {

    await mongoose.connect("mongodb://127.0.0.1:27017/ocr");
}

const vehicleSchema = new mongoose.Schema({

    vehicleNumber: Number,
    driverName: String,
    VehicleRegNumber: Number,
    country: String,
});

const Vehicle = mongoose.model("Vehicle", vehicleSchema);