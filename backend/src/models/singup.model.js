const mongoose=require('mongoose')
const bcrypt=require("bcryptjs")
const singupschema=new mongoose.Schema({
    email:{
       type:String,
        unique:true,
        required:true,
        isEmail:true,
        lowercase:true,
        trim:true,
        match:[/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/]
    },
    password:{
        type:String,
        minlength:[8,"length must atleast 8 characters"],
        required:true
    }
})
singupschema.virtual("confirmPassword")
.set(function(value){
    this._confirmPassword=value
})
.get(function(){
    return this._confirmPassword
})
singupschema.pre("save",async function () {
    if(this.password!==this._confirmPassword){
        throw new Error ("password is not matching ")   
    }
    hash=await bcrypt.hash(this.password,10)
    this.password=hash
})
const singupmodel=mongoose.model("singups",singupschema)
module.exports=singupmodel;