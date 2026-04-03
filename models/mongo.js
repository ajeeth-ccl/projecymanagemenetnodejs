const mongoose = require("mongoose")

mongoose.connect("mongodb://127.0.0.1:27017/logDB")

mongoose.connection.on("connected",()=>{console.log("momgodb connected")})

mongoose.connection.on("error",(err)=>{console.log("error",err)})

module.exports = mongoose;