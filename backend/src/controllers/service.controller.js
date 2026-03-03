import { ApiError } from '../utils/ApiError.js'
import { ApiResponse } from '../utils/ApiResponse.js'
import { AsyncHandler } from '../utils/AsyncHandler.js'
import { Service } from '../models/service.model.js'

//add service
const addService = AsyncHandler(async (req,res) => {
    if(req.user.role !== 'admin'){
        throw new ApiError(403,"Only admin can add new service")
    }
    const { serviceType, serviceCharge } = req.body
    if( !serviceType || !serviceCharge ){
        throw new ApiError(400,"All fields value is required.")
    }
    const serviceExists = await Service.findOne({serviceType})
    if(serviceExists){
        throw new ApiError(409,"service is already in record.")
    }
    const service = await Service.create({
        serviceType,
        serviceCharge
    })
    if( !service ){
        throw new ApiError(400,"new service could not be added.")
    }
    return res.status(201).json(
        new ApiResponse(201,service,"new service added successfully.")
    )
})

// update service charge
const updateServiceCharge = AsyncHandler(async ( req,res ) => {
    if(req.user.role !== 'admin'){
        throw new ApiError(403,"Only admin can update service charge.")
    }
    const { serviceId } = req.params
    if(!serviceId){
        throw new ApiError(400,"service id is required.")
    }
    const { serviceCharge } = req.body
    if( !serviceCharge ){
        throw new ApiError(400,"service charge is needed.")
    }
    const service = await Service.findByIdAndUpdate(
       serviceId,
       {
        $set : {serviceCharge}
       },
       { new : true}
    )
    if( !service ){
        throw new ApiError(404,"service not found.")
    }
    return res.status(200).json(
        new ApiResponse(200,service,"service charge updated successfully.")
    )
})

// remove service
const deleteService = AsyncHandler( async ( req,res ) => {
    if(req.user.role !== 'admin'){
        throw new ApiError(403,"Only admin can delete service.")
    }
    const { serviceId } = req.params
    if(!serviceId){
        throw new ApiError(400,"service id is required.")
    }
    const deletedService = await Service.findByIdAndDelete(serviceId)
    if(!deletedService){
        throw new ApiError(404,"service not found.")
    }
    return res.status(200).json(
        new ApiResponse(200,deletedService,"Service deleted successfully.")
    )
})

// get all service
const getAllService = AsyncHandler(async (req,res) => {
    const availableService = await Service.find({})
    if(availableService.length === 0){
        throw new ApiError(404,"No service is available!!")
    }
    return res.status(200).json(
        new ApiResponse(200,availableService,"All services fetched successfully")
    )
})

export {
    addService,
    updateServiceCharge,
    deleteService,
    getAllService
}