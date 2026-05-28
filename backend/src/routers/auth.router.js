const express=require('express')
const authController=require("../controller/auth.controller")
const router=express.Router()
router.post("/singup",authController.singup)
module.exports=router