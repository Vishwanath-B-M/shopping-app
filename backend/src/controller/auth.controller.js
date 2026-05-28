const singupmodel=require('../models/singup.model')
const jwt=require("jsonwebtoken")
async function singup(req,res) {
    const {email,password,confirmPassword}=req.body
    const user=await singupmodel.create({
        email,
        password,
        confirmPassword
    })
   const token=jwt.sign({id:user._id,email:user.email},process.env.jwturl)
    res.cookie("token",token)
    res.status(201).json({
        message:"singup succefully",
        token,
        user:{
            email:user.email,

        }
    })
    
}
module.exports={singup}