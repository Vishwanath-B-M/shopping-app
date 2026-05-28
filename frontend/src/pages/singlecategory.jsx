import { useState,useEffect } from "react"
import SingleCate from "../component/categoryTile/singlecategorytile"
import { useParams } from "react-router-dom"
export default function CategoryCard(){

    const [product,setproduct]=useState([])
    const [loading,setloading]=useState(false)
    const { slug } = useParams()
    console.log("what", slug)
 async function FetchProduct(category){
   setloading(true)
   const res=await fetch(`https://dummyjson.com/products/category/${category}`)
   const data= await res.json()

   if(data){
       setloading(false)
       setproduct(data?.products||[])
       console.log("DATA:", data)
   }
 }
useEffect(()=>{
    if(slug){
   FetchProduct(slug)
    }

},[slug])

    return(<><div className=" min-h-screen min-w-screen bg-gradient-t-r from-blue-300 to-purple-300">
     
        <div className="lg:min-h-screen grid grid-cols-2 lg:grid-cols-4 bg-gradient-to-r from-blue-300 to-purple-300 shadow-3xl gap-2 mx-auto lg:max-w-6*l">
        {console.log(product)}
            {product.length > 0 && product?.map(item=> <SingleCate key={item.id} product={item}/>)}
        </div>
        </div>
        </>)
}