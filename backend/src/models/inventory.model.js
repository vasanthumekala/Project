import mongoose from 'mongoose'

const inventorySchema = new mongoose.Schema({
    productName : {
        type : String,
        required : true,
        lowercase : true,
        trim: true,
        index: true
    },
    productNo : {
        type : String,
        required : true,
        unique: true,
        trim: true
    },
    type : {
        type : String,
        required : true,
        trim: true
    },
    price : {
        type : Number,
        required : true,
        min: 0
    },
    quantity : {
        type : Number,
        required : true,
        default : 0,
        min: 0
    }
})

export const Inventory = mongoose.model("Inventory",inventorySchema)