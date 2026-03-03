import { Router } from 'express'
import {verifyJWT} from "../middlewares/auth.middleware.js"
import {addService,
    updateServiceCharge,
    deleteService,
    getAllService
} from '../controllers/service.controller.js'

const router = Router()

router.route("/addService").post(verifyJWT,addService)
router.route("/update/:serviceId").patch(verifyJWT,updateServiceCharge)
router.route("/remove/:serviceId").delete(verifyJWT,deleteService)
router.route("/allService").get(verifyJWT,getAllService)


export default router