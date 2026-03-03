import { Router } from 'express'
import { verifyJWT } from '../middlewares/auth.middleware.js'
import { addProduct,
    updateProductDetails, 
    deleteProduct, 
    incrementQuantity, 
    decrementQuantity, 
    allProduct } from '../controllers/inventory.controller.js'

const router = Router()

router.route("/addProduct").post(verifyJWT,addProduct)
router.route("/updateProduct/:productId").patch(verifyJWT,updateProductDetails)
router.route("/deleteProduct/:productId").delete(verifyJWT,deleteProduct)
router.route("/incproduct/:productId").patch(verifyJWT, incrementQuantity);
router.route("/decproduct/:productId").patch(verifyJWT, decrementQuantity);
router.route("/allProduct").get(verifyJWT,allProduct)


export default router