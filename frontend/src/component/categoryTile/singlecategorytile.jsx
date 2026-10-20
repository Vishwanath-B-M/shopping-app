import { useDispatch,useSelector } from "react-redux"
import { addTocart,removeFromcart} from "../../store/slice/cartslice"
import { useState } from "react"
export default function SingleCate({product}){
  if(!product) return null
  const dispatch=useDispatch()
  const cart=useSelector(state=>state.cart.cart)
  const [message,setmessage]=useState()
async function HandleAddtoCart(){
    const res=await fetch("http://localhost:3000/api/cart/cart",{
      method:"POST",
      headers:{
      "content-type":"application/json"
      },
      credentials:"include",
      body:JSON.stringify({
        productId:product.id,
        quantity:"1",
        Price:product.price,
        Image:product.images
      })
    })
     const data=await res.json()
     console.log(data)
     setmessage(data.message)
     const cartItems = data.cart[1].cartitems;
      dispatch(addTocart(cartItems))
      console.log( product)
  }
  async function RemoveFromCart(){
    const res=await fetch("http://localhost:3000/api/cart/cartdelete",{
      method:"DELETE",
      headers:{
        "content-type":"application/json"
      },
      credentials:"include",
      body:JSON.stringify({
        productId:product.id
       }),
    })
    const data=await res.json()
    console.log(data)
    setmessage(data.message)
    dispatch(removeFromcart(product.id))
  }
  const isitem=cart.some(cartitems=>cartitems?.productId===product?.id)
    return(<>
    <div className="flex flex-col max-h-[320px] lg:max-h-[400px] overflow-hidden items-center m-2 gap-2 border rounded-2xl shadow-xl 
hover:scale-105 transition-transform duration-500">

  <img 
    src={product.thumbnail} 
    alt={product.title}
    className="object-cover h-[200px] lg:h-48 w-full"
  />

  <h3 className="w-16 truncate text-gray-700 font-bold text-sm lg:text-lg text-center p-2">
    {product.title}
  </h3>

  <p className="text-gray-600 text-sm">
    {product.availabilityStatus}
  </p>

  <p className="text-gray-800 font-semibold text-sm lg:text-lg">
    ${product.price}
  </p>

  <button 
    onClick={() => isitem ? RemoveFromCart() : HandleAddtoCart()} 
    className="w-3/4 h-8 text-sm bg-white border rounded-xl shadow 
    hover:scale-105 transition mb-2"
  >
    {isitem ? "Remove from cart" : "Add to cart"}
  </button>

</div>
    
    
    </>)
}
   