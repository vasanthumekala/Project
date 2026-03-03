import { Router } from "express"
import { verifyJWT } from "../middlewares/auth.middleware.js"
import { registerCar,
    updateCar,
    removeCar
 } from "../controllers/car.controller.js"

const router = Router()

router.route("/register").post(verifyJWT,registerCar)
router.route("/update/:carId").patch(verifyJWT,updateCar)
router.route("/remove/:carId").delete(verifyJWT,removeCar)

export default router