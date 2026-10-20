
import {useDispatch, useSelector} from 'react-redux'
import { addTocart ,removeFromcart} from '../../store/slice/cartslice'
import { useState } from 'react'


export default function ProductTile({product}){
const [message,setmessage]=useState();
const dispatch=useDispatch()
const items=useSelector(state=>state.cart.cart)
console.log(items)
async  function HandleAddtoCart(){
   const res=await fetch("https://shopping-app-4-3bid.onrender.com/api/cart/cart",{
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
   
async function RemoveHandle() {
  try {
      const res = await fetch("https://shopping-app-4-3bid.onrender.com/api/cart/cartdelete", {
          method: "DELETE",
          headers: {
              "Content-Type": "application/json"
          },
          credentials: "include",
          body: JSON.stringify({
              productId: product.id
          })
      });

      const data = await res.json();
      console.log(data);
      setmessage(data.message);

      if (res.ok) {
          const cartItems = data.cart.cartitems;
          console.log(cartItems);

          dispatch(removeFromcart(product.id));
      }
  } catch (error) {
      console.error(error);
      setmessage("Failed to remove product");
  }
}
const isitem=items.some(cartitems=>cartitems?.productId===product?.id)


    return(<div>
      <div className="flex flex-col max-h-[400px] w-full items-center justify-between 
border-2 border-black mt-2 gap-2 rounded-2xl shadow-xl 
hover:scale-105 transition-transform duration-500 overflow-hidden">

  <img 
    src={product.images[0]} 
    alt={product.title} 
    className="object-cover h-48 w-full"
  />

  <h1 className="w-40 truncate text-gray-700 font-bold text-lg text-center">
    {product.title}
    <p>{message}</p>
  </h1>

  <h4 className="text-gray-600 text-sm">
    {product.availabilityStatus}
  </h4>

  <h4 className="text-gray-800 text-lg font-semibold">
    ${product.price}
  </h4>

  <div className="w-full flex justify-center px-2 pb-2">
    <button 
      onClick={() =>{
         if(isitem) {
         RemoveHandle()
      }else{
        HandleAddtoCart()
      }
    }}className="w-full lg:w-1/2 h-10 text-sm bg-white border rounded-xl shadow 
      hover:scale-105 transition">
      
      {isitem ? "Remove from cart" : "Add to cart"}
    </button>
  </div>

</div>
      </div>)
      }
 