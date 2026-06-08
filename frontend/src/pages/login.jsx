import { useState } from "react";
import { Link,useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux"
import { loginSuceess } from "../store/autoslice/auto"



export default function Login(){
    const [login,setlogin]=useState(true)
    const [password,setpassword]=useState("")
    const [message,setmessage]=useState("")
    const [email,setemail]=useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const dispatch=useDispatch()
    const navigate=useNavigate()
     async function FetchLogin() {
     const res=await fetch("http://localhost:3000/api/auth/login",{
                method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials:"include",
    body: JSON.stringify({
       email,
       password,
        }),
    });
            const data=await res.json()
            console.log(data)
        if(res.status===201){
            console.log(data.message)
            setmessage("login successfully")
            dispatch(loginSuceess(data.token))
            setmessage("suceesufully login")
            setemail("")
            setpassword("")
            navigate("/")
        }
        else{
            setmessage("login failed")
            email===""||password===""?setmessage(data.message):setmessage("invalid username or password")
            setemail("")
            setpassword("")
        }
    };
    async function signup(){
        const res=await fetch("http://localhost:3000/api/auth/singup",{
            method:"post",
            headers:{
                "content-type":"application/json",
            },
            credentials:"include",
            body:
                JSON.stringify({
                    email,
                    password,
                    confirmPassword
        })
            })
            const data=await res.json()
            if(data.status===201){
                setmessage(data.message)
                dispatch(loginSuceess(data.token))
                setemail("")
                setpassword("")
                setConfirmPassword("")
                navigate("/")
                
            }else{
                setmessage(data.message)
            }
        
}
    return(<>
    
    <div className="min-h-screen bg-gradient-to-r from-blue-300 to-purple-300 flex flex-col  items-center ">
    
    <div className=" w-full flex flex-col  items-center mt-4">
    <div className=" bg-white-700">
        <div className=" flex flex-row items-center object-cover ">
            <button className="w-32 rounded-2xl lg:w-64 h-16 gap-2 lg:gap-4 text-black text-2xl lg:text-4xl bg-white/40 border-2 lg:border-4 border-white/40 rounded-3xl shadow-lg  hover:backdrop-blur-2xl hover:text-3xl lg:hover:text-5xl mr-2" onClick={()=>setlogin(true)}>login</button>
            <button className="w-32 rounded-2xl lg:w-64 h-16 gap-2 lg:gap-4 text-black text-2xl lg:text-4xl bg-white/40 border-2 lg:border-4 border-white/40 rounded-3xl shadow-lg  hover:backdrop-blur-2xl hover:text-3xl lg:hover:text-5xl" onClick={()=>setlogin(false)||signup}>signup</button>
        </div>
        <div>{login?<div className="flex flex-col items-center p-2 object-cover">
                <input type="text" value={email} onChange={(e)=>setemail(e.target.value)} placeholder="email" className="w-64 h-8 lg:w-96 lg:h-16  border-2 lg:gap-2 p-2 lg:text-3xl border-2 gap-2  text-xl rounded-2xl"/>
                <input type="password" value={password} onChange={(e)=>setpassword(e.target.value)} placeholder="password"className="w-64 h-8 mt-2 lg:w-96 lg:h-16 border-2 lg:gap-4 p-2 lg:mt-4 lg:text-3xl rounded-2xl gap-2 textxl"/>
                <Link to="https://youtu.be/T330K2Ck9DU?list=RDT330K2Ck9DUrel=preload" className="lg:text-3xl lg:m-4 lg:hover:text-4xl text-md m-2 hover:text-3xl ">
                          forget password?
                </Link> 
                <button type="button" className="w-32 lg:w-64 h-16
                 gap-2 text-black text-2xl bg-white/40  border-2 border-white/40 shadow-lg  hover:backdrop-blur-2xl hover:text-3xl 
                 lg:gap-4 lg:text-4xl  rounded-2xl lg:hover:text-5xl" onClick={FetchLogin}>login</button>
                <p>{message}</p>
                <p className="textxl lg:text-3xl mt-4">not a member ? <a onClick={()=>{setlogin(false)||signup}} className="bg-white/40 border-2 p-2 gap-2 text-2xl hover:backdrop-blur hover:text-4xl rounded-xl">signup now </a></p>
            </div>:""}
           {!login? <div className="flex flex-col items-center p-4">
                <input type="email" placeholder="email"className="w-64 h-8 lg:w-96 lg:h-16 border-2 gap-2 p-2 lg:text-3xl text-xl rounded-2xl" onChange={(e)=>setemail(e.target.value)}/>
                <input type="password" placeholder="password"className="w-62 h-8 lg:w-96 lg:h-16 border-2 gap-2 p-2 mt-2 lg:text-3xl text-xl rounded-2xl" onChange={(e)=>setpassword(e.target.value)}/>
                <input type="password" placeholder="confirm password"className="w-62 h-8 lg:w-96 lg:h-16 border-2 lg:gap-4 p-2 mt-2 lg:text-3xl  gap-2 text-xl rounded-2xl" onChange={(e)=>setConfirmPassword(e.target.value)}/>
                <p>{message}</p>
                <button type="button" className="w-32  lg:w-64 h-16 lg:gap-4 text-black lg:text-4xl bg-white/40  lg:border-4 border-white/40 lg:rounded-3xl shadow-lg lg:hover:text-5xl lg:m-4 
                gap-2 m-2 text-2xl bg-white/40  border-2 rounded-2xl hover:text-3xl"onClick={signup}>signup</button>
            </div>:""}
        </div>
    </div>
    </div>
    </div>
     </>)
}
