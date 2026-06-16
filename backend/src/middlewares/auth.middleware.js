const jwt=require("jsonwebtoken")

async function userCheck(req,res,next) {
    const token=req.cookies.token
    if(!token){
        return res.status(401).json({
            message:"unauthorized access"
        })
    }
   
    try{
        const decoded=jwt.verify(token,process.env.jwturl)
        console.log("Decoded Token:", decoded)
        req.userId=decoded.id
        next()
    }catch(error){
        console.log(error)
        return res.status(201).json({
            message:"you need to login or singup"
        })
    }
};
module.exports={userCheck};