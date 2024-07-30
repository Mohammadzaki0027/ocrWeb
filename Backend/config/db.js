const mongoose=require("mongoose")
require("dotenv").config()
let url=process.env.mongoose_url


const connection=mongoose.connect(url)
module.exports={connection}

