const mongoose=require("mongoose")

const cart=new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user",
        unique:true
    },
    cartitems:[{
        productId:{
            type:String,
            required:true
        },
        quantity:{
                type:String,
                required:true,
                min:1
       },
       Price:{
        type:Number,
        required:true
       }


    }]
})
const cartmodel=mongoose.model("cart",cart);
module.exports=cartmodel;