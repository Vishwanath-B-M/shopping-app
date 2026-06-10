const cartmodel=require("../models/usercart.model")
async function cart(req,res) {
    const userId=req.user_id
    const {productId,quantity,Price}=req.body
    console.log(req.body);
console.log(productId, quantity, Price);
    const finduser=await cartmodel.findOne({user:userId})
   try{ if(finduser){
        const itemindex=finduser.cartitems.findIndex(cartitems=>cartitems.productId===productId)
        if(itemindex>-1){
            finduser.cartitems[itemindex].quantity+=Number(quantity)
        }else{
            finduser.cartitems.push({productId,quantity:Number(quantity),Price:Number(Price)})
        }
    
    return res.status(200).json({
        message:"successully added to cart",
        cart:finduser
    })
}else{
    const newcart=await cartmodel.create({
        user:userId,
        cartitems:[{
        productId,
        quantity:Number(quantity),
        Price:Number(Price)
    }]
    })
    return res.status(200).json({
        message:'succefully added to cart',
        cart:newcart
    })
}}catch(error){
    console.log(error)
    return res.status(403).json({
        message:"server error"
    })

}
}
module.exports={cart}