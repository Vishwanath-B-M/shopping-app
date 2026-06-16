const cartmodel=require("../models/usercart.model")
async function cart(req,res) {
    const userId=req.userId
    const {productId,quantity,Price,Image}=req.body
    console.log(req.body);
console.log(productId, quantity, Price);
    const finduser=await cartmodel.findOne({user:userId})
   try{ if(finduser){
        const itemindex=finduser.cartitems.findIndex(cartitems=>cartitems.productId===productId)
        if(itemindex>-1){
            finduser.cartitems[itemindex].quantity+=Number(quantity)
        }else{
            finduser.cartitems.push({productId,
                quantity:Number(quantity),
                Price:Number(Price),
                Image})
        }
    await finduser.save();
    return res.status(200).json({
        message:"successully added to cart",
        cart:[{
            user:finduser._id,
        },finduser]
    })
}else{
    const newcart=await cartmodel.create({
        user:userId,
        cartitems:[{
        productId,
        quantity:Number(quantity),
        Price:Number(Price),
        Image
    }]
    })
    await newcart.save();
    return res.status(200).json({
        message:'succefully added to cart',
        cart:[{
            user:newcart._id,   
        },newcart]
    })
}}catch(error){
    console.log(error)
    return res.status(403).json({
        message:"server error"
    })

}
}
async function cartshow(req,res) {
    const userId=req.userId
    
    try{
        const cart=await cartmodel.findOne({user:userId})
        if(cart){
        return res.status(403).json({
            message:"cart",
        cart:cart
        })
    }}catch(error){
        console.log(error)
        return res.status(200).json({
            message:"you need to login or singup"
        
    }) 
}  
}
module.exports={cart,cartshow}