const express=require('express')
const cartController=require("../controller/cart.controller")
const authmoddileware=require("../middlewares/auth.middleware")
const router=express.Router()
router.post("/cart",cartController.cart)


module.exports=router