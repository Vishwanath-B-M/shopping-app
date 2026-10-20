const cartmodel=require("../models/usercart.model")
async function cart(req,res) {
    const userId=req.userId
    const {productId,quantity,Price,Image}=req.body
    const finduser=await cartmodel.findOne({user:userId})
   try{ 
    if(finduser){
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

async function cartdelete(req, res) {
    const userId = req.userId;
    const { productId } = req.body;

    try {
        const cart = await cartmodel.findOne({ user: userId });

        if (!cart) {
            return res.status(404).json({
                message: "Cart not found"
            });
        }

        const itemindex = cart.cartitems.findIndex(
            cartitem => String(cartitem.productId) === String(productId)
        );

        if (itemindex === -1) {
            return res.status(404).json({
                message: "Item not found in cart",
                productId: productId
            });
        }

        cart.cartitems.splice(itemindex, 1);

        await cart.save();

        return res.status(200).json({
            message: "Successfully deleted from cart",
            cart: cart
        });

    } catch (error) {
        console.log(error);

        return res.status(500).json({
            message: "Server error"
        });
    }
}

module.exports={cart,cartshow,cartdelete}