import { useState,useEffect } from "react"
import { Circles } from "react-loader-spinner";
import ProductTile from "../component/products";
export default function Home(){
     const [product,setproduct]=useState([])
     const [loading,setloading]=useState(false)
     const [search,setsearch]=useState("")

  async function FetchProduct(){
    setloading(true)
    const res=await fetch('https://dummyjson.com/products')
    const data= await res.json()
    console.log(data)
    if(data){
        setloading(false)
        setproduct(data.products)
    }
  }
useEffect(()=>{
    FetchProduct()
},[])


const searchs= product.filter((item)=>item.title.toLowerCase().includes(search.toLowerCase()))


    return(<div>
    <div className=" min-h-full bg-gradient-to-r from-blue-300 to-purple-300">{
        loading ? <div className="min-h-screen w-full flex justify-center items-center">
            <Circles
            height={'120'}
            width={'120'}
            color="rgb(127,29,29)"
            visible={true}
            />
        </div> : <div>
            <div>
                <input type="text" placeholder="search" className="lg:w-2/4 lg:h-10 lg:border-2 lg:ml-4 lg:text-3xl lg:mr-20 lg:rounded-xl lg:hover:text-4xl hover:w-3/4 
                w-2/4 h-5 border m-2 text-2xl rounded " value={search} onChange={(e)=>setsearch(e.target.value)}/>
            </div>


            <div className="min-h-screen  grid grid-cols-2 md:grid-cols-3 gap-2 lg:grid-cols-4 gap-2 max-w-auto p-4 gap-2">
           {search.length>0?
           (searchs.length>0 ?
            (searchs.map((item)=><ProductTile key={item.id} product={item}/>)):<p className="h-screen w-screen flex flex-cols items-center justify-center lg:text-5xl text-3xl font-bold">search is not found</p>)
          
            
            :(product&&product.length?
            product.map((productitem)=> <ProductTile key={productitem.id} product={productitem}/>):null)  
            }
            
            </div>

            </div>}
    </div>
    </div>)
}

