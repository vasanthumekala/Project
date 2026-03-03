import {Router} from "express"
import {upload} from "../middlewares/multer.middleware.js"
import {verifyJWT} from "../middlewares/auth.middleware.js"
import {addMechanic,
    updateMechanic,
    removeMechanic,
    allMechanic,
    updateMechanicProfile
} from '../controllers/mechanic.controller.js'

const router=Router();

router.route("/addMechanic").post(upload.single("profileImage"),verifyJWT,addMechanic)
router.route("/update/:mechanicId").post(verifyJWT,updateMechanic)
router.route("/remove/:mechanicId").delete(verifyJWT,removeMechanic)
router.route("/allMechanic").get(verifyJWT,allMechanic)
router.route("/updateImage/:mechanicId").patch(upload.single("profileImage"),verifyJWT,updateMechanicProfile)

export default router