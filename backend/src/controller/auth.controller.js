const singupmodel=require('../models/singup.model')
const jwt=require("jsonwebtoken")
async function singup(req,res) {
    const {email,password,confirmPassword}=req.body
    const emailisalreadythere=await singupmodel.findOne({email})
    if(emailisalreadythere){
        return res.status(200).json({
            message:"email is already exists"

        })
    }
  try{ const user=await singupmodel.create({
        email,
        password,
        confirmPassword
    })


   const token=jwt.sign({id:user._id,email:user.email},process.env.jwturl)
     res.cookie("token",token)
    res.status(201).json({
        message:"singup succefully",
        token:token,
        user:{
            email:user.email,
            userID:user._id

        }
    })
    if(!token){
        return res.status(200).json({
            message:"you need to singup or login"


        })
 }}catch(error){
    if(error){
    return res.status(200).json({
        message:error._message
    })}
    res.status(400).json({
        message:"invalid credentials"
    })

}
    
}
async function login(req,res) {
    const {email,password}=req.body
    const useristhere=await singupmodel.findOne({email}).select("+password")
    if(!useristhere){
        return res.status(200).json({
            message:"you need to singup"
        })
    }
    const passwordvarefication=await useristhere.compare(password)
    if(!passwordvarefication){
        return res.status(200).json({
            message:'email or password is incorrect'
        })
    }
    const token=jwt.sign({id:useristhere._id,email:useristhere.email},process.env.jwturl)
    res.cookie("token",token)
     return res.status(201).json({
        message:'login succefully',
        token,
        user:{
            email:useristhere.email,
            userID:user._id
        }
    })
}
async function logout(req,res) {
    res.clearCookie("token")
    res.status(200).json({
        message:"logout succefully"
    })
    
}

module.exports={singup,logout,login}