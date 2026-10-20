const express=require('express')
const cartController=require("../controller/cart.controller")
const authmoddileware=require("../middlewares/auth.middleware")
const router=express.Router()
router.post("/cart",authmoddileware.userCheck,cartController.cart)
router.get("/cartshow",authmoddileware.userCheck,cartController.cartshow)
router.delete("/cartdelete",authmoddileware.userCheck,cartController.cartdelete)
module.exports=router