import mongoose from "mongoose"

const carSchema = new mongoose.Schema({
    brand : {
        type : String,
        required : true,
        trim : true
    },
    model : {
        type : String,
        required : true,
        trim : true
    },
    licenseNo : {
        type : String,
        required : true,
        unique : true,
        uppercase : true,
        trim : true
    },
    serviceHistory : [{
        serviceType : String,
        date : Date
    }],
    owner : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User",
        required : true
    }
},{ timestamps: true })

export const Car = mongoose.model("Car",carSchema)