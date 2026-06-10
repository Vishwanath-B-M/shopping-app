const jwt=require("jsonwebtoken")

async function userCheck(req,res,next) {
    const token=req.cookies.token
    if(token){
        return res.status(200).json({
            message:"login is valid",
            token:token
        })
    }else{
        return res.status(201).json({
            message:"you need to login or singup"
        })
    }
};
module.exports={userCheck};