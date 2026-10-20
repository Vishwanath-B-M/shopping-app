const express=require('express')
const cookieparser=require('cookie-parser')
const cors=require('cors')
const authrouter=require('./routers/auth.router')
const cartrouter=require("./routers/cart.router")
const app=express()
app.use(express.json())
app.use(cookieparser())
const allowedOrigins = [
    "https://shopping-app-4.vercel.app",
    "https://shopping-app-4-git-main-t9b66k7jyg-1959s-projects.vercel.app"
  ];
app.use(cors({
    origin: allowedOrigins,
    credentials: true,
    methods:["GET","POST","PUT","DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"]
}))
app.use("/api/auth",authrouter)
app.use("/api/cart",cartrouter)
module.exports=app;