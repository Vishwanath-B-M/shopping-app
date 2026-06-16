
import {useDispatch} from 'react-redux'
import  {removeFromcart} from '../../store/slice/cartslice'

export default function CartTile({cartitem}){
const dispatch=useDispatch()
function RemoveHandle(){
    dispatch(removeFromcart(cartitem.productId))
}
    return(<>
    <div>  <div className='min-h-[60vh] flex flex-col items-center justify-center object-cover '>
        <img src={cartitem.Image?cartitem.Image[0]:""} alt='' className='w-full h-[45vh] hover:scale-105 transition-transform duration-300'/>
        <p className='text-2xl'><span>  {cartitem._id}</span></p><br></br>
        <p className='text-2xl'><span>  quantity:{cartitem.quantity}</span></p><br></br>
        <p className='text-2xl'><span>  price: {cartitem.Price}$</span></p>



        <div>
        <button  onClick={ RemoveHandle } className="w-full h-10 text-sm border bg-white shadow-xl rounded-xl hover:scale-105 p-2 transition m-2">

              remove from the cart 
          </button>
        </div>
        
        
        </div> </div>
    
    
    </>)


}
