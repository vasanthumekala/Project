import mongoose from 'mongoose'

const serviceSchema = new mongoose.Schema({
    serviceType:{
        type : String,
        required : true,
        unique : true,
        trim : true
    },
    serviceCharge :{
        type : Number,
        min : 0,
        required : true
    }
},{ timestamps:true})

export const Service = mongoose.model("Service",serviceSchema)
