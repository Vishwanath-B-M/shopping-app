const express=require('express')
const cookieparser=require('cookie-parser')
const cors=require('cors')
const authrouter=require('./routers/auth.router')
const cartrouter=require("./routers/cart.router")
const app=express()
app.use(express.json())
app.use(cookieparser())
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}))
app.use("/api/auth",authrouter)
app.use("/api/cart",cartrouter)
module.exports=app;