require("dotenv").config()
const app=require("./src/app")
const connectiondb=require("./src/database/db")
connectiondb()

app.listen(3000,()=>{
    console.log('server is running in port number 3000')
})