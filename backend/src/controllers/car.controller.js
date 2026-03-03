import { ApiError } from '../utils/ApiError.js'
import { ApiResponse } from '../utils/ApiResponse.js'
import { AsyncHandler } from '../utils/AsyncHandler.js'
import { Car } from '../models/car.model.js'

// register car
const registerCar = AsyncHandler(async (req,res) => {
    const { brand, model, licenseNo } =req.body
    if( !brand || !model || !licenseNo ){
        throw new ApiError(400,"All fields are required.")
    }
    const normalized = licenseNo.toUpperCase()
    const existingCar = await Car.findOne({licenseNo:normalized})
    if(existingCar){
        throw new ApiError(400,"This car is already register with us.")
    }
    const car =await Car.create({
        brand,
        model,
        licenseNo,
        owner : req.user._id
    })
    return res.status(201).json(
        new ApiResponse(201, car, "Car registered successfully")
    )
})

//update car details
const updateCar =AsyncHandler(async (req,res) => {
    const { carId } =req.params
    if(!carId){
        throw new ApiError(400,"car id is required")
    }
    const {brand,model,licenseNo} =req.body
    if( !brand && !model && !licenseNo ){
        throw new ApiError(400,"Atleast one field is required.")
    }
    const car = await Car.findById(carId)
    if (!car) {
        throw new ApiError(404, "Car not found")
    }
    if (
        car.owner.toString() !== req.user._id.toString() &&
        req.user.role !== "admin"
    ) {
        throw new ApiError(403, "Not allowed to update this car")
    }
    const updatedFields = {}
    if (licenseNo) {
        const normalized = licenseNo.toUpperCase()
        const exists = await Car.findOne({ licenseNo:normalized })
        if (exists && exists._id.toString() !== carId) {
            throw new ApiError(409, "License number already exists")
        }
        updatedFields.licenseNo = normalized
    }
    if(brand!==undefined) updatedFields.brand=brand
    if(model!==undefined) updatedFields.model=model
    const updatedcar = await Car.findByIdAndUpdate(
        carId,
        {
            $set: updatedFields
        },
        { new : true }
    )
    if(!updatedcar){
        throw new ApiError(404,"Car not found")
    }
    return res.status(200).json(
        new ApiResponse(200,updatedcar,"update success")
    )
})

//remove car
const removeCar = AsyncHandler(async (req,res) => {
    if (car.owner.toString() !== req.user._id.toString() &&
        req.user.role !== "admin") {
        throw new ApiError(403, "Not allowed to remove this car")
    }
    const { carId } = req.params
    if(!carId){
        throw new ApiError(400,"car id is needed.")
    }
    const car = await Car.findByIdAndDelete(carId)
    if(!car){
        throw new ApiError(404,"car not found")
    }
    return res.status(200).json(
        new ApiResponse(200,car,"car removed successfully.")
    )
})
export{
    registerCar,
    updateCar,
    removeCar
}