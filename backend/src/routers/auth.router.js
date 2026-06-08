const express=require('express')
const authController=require("../controller/auth.controller")
const middleware=require("../middlewares/auth.middleware")
const router=express.Router()
router.post("/singup",authController.singup)
router.get("/logout",authController.logout)
router.post("/login",authController.login)
router.get("/cart",middleware.userCheck)
module.exports=router