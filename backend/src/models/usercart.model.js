const mongoose=require("mongoose")

const cart=new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user",
        unique:true
    },
    cartitems:[{
        productId:{
            type:Number,
            required:true
        },
        quantity:{
                type:Number,
                required:true,
                min:1
       },
       Price:{
        type:Number,
        required:true
       },
       Image:[{
        type:String
       }]


    }]
})
const cartmodel=mongoose.model("cart",cart);
module.exports=cartmodel;