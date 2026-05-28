
import {useDispatch, useSelector} from 'react-redux'
import { addTocart ,removeFromcart} from '../../store/slice/cartslice'


export default function ProductTile({product}){

const dispatch=useDispatch()
const cart =useSelector(state=>state.cart.cart)


     function HandleAddtoCart(){
    dispatch(addTocart(product))
    console.log( product)
     }
    function RemoveHandle(){
      dispatch(removeFromcart(product.id))
      console.log( product.id);

    }
   const isitem= cart.some(item=>item.id===product.id)


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
  </h1>

  <h4 className="text-gray-600 text-sm">
    {product.availabilityStatus}
  </h4>

  <h4 className="text-gray-800 text-lg font-semibold">
    ${product.price}
  </h4>

  <div className="w-full flex justify-center px-2 pb-2">
    <button 
      onClick={() => isitem ? RemoveHandle() : HandleAddtoCart()}
      className="w-full lg:w-1/2 h-10 text-sm bg-white border rounded-xl shadow 
      hover:scale-105 transition">
      
      {isitem ? "Remove from cart" : "Add to cart"}
    </button>
  </div>

</div>
      


      </div>)
 }