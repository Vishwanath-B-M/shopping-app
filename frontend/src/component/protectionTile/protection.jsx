
import { useState,useEffect } from "react";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const [loading,setloading]=useState(true)
  const [cart,setcart]=useState(false)
  const [message,setmessage]=useState()
 useEffect(()=>{
   async function checking(){
  try{ 
  const res=await fetch("http://localhost:3000/api/auth/cart",
    {method:'GET',
    credentials:"include"
  });
  const data = await res.json()
  const token=data.token
  if(token){
  console.log(token)
  setcart(true)
  }
}catch(error){
  console.log(error)
  setmessage(error)
}finally{
  setloading(false)
}
}
checking();
 },[]);

if(loading){
  return <div className="h-full text-4xl flex flex-cols  ">loading ,{message}</div>
}
if(!cart){
  return  <Navigate to="/login" replace />
}
return children
}
