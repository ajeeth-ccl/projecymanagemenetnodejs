const mongoose = require("mongoose")


const logSchema = new mongoose.Schema({
    action:{
        type:String,
        required:true,
    },
    data:{
          type:mongoose.Schema.Types.Mixed,
          required:true,
    },
    userId:{
    type:Number,
    required:true,
    },
},{timestamps:true})

// Atlast we have to check this Ajeeth

module.exports = mongoose.models.Log || mongoose.model("Log", logSchema);














