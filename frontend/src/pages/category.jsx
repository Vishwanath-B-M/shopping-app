import { useState,useEffect } from "react"
import CategoryTile from "../component/categoryTile/categorytile";
import { Circles } from "react-loader-spinner"

export default function Category(){
    const [Category,setcategory]=useState([])
    const [loading,setloading]=useState(true)
    async function FetchData() {
        const res=await fetch('https://dummyjson.com/products/categories')
        const data=await res.json()
        if(data){
            setloading(false)
            setcategory(data)
        }   
    }
    useEffect(()=>{
        FetchData()
    },[])
    return(<div className="h-screen bg-gradient-to-r from-blue-300 to-purple-300">
    <div className="min-h-4/4 ">{loading?<div className="flex flex-cols items-center justify-center min-h-[80vh] w-full">
        <Circles
        height={'120'}
        width={'120'}
        color={'red'}
        visible={true}/>
        </div>:
        <div className="h-full bg-gradient-to-r from-blue-300 to-purple-300 flex flex-col items-center justify-center shadow-2xl overflow-hidden overflow-scroll">
            {
                Category.map((item)=><CategoryTile key={item.id} Category={item}/>)
            }   
        </div>}
        </div>
     </div>)
}