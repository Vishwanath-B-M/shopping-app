
//import { Navigate } from "react-router-dom"


//export default function ProtectedRoute({children}){
   // const token=localStorage.getItem("token")
    //console.log("get",token)
    //if(!token||token===undefined){
    //<Navigate to='/login'/>}
   // return children
//}
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const token = localStorage.getItem("token")||cookieStore.get("token");
  console.log("TOKEN:", token);

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

