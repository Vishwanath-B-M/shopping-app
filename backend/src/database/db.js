const mongoose=require('mongoose')

async function connectionDb() {
    await mongoose.connect(process.env.mongooseurl).then(()=>{
        console.log("mongoose connected succefully")
    }).catch(err=>{
        console.log(err)
        console.log("something in mongoose goes wrong")
    })  
}
module.exports=connectionDb
