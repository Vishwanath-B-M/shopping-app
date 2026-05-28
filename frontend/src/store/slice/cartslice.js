import { createSlice } from '@reduxjs/toolkit';

const token=localStorage.getItem("token")


const initialState={
    cart:JSON.parse(localStorage.getItem(`cart_${token}`))||[],
   
    
}
const cartSlice=createSlice({
    name:'cart',
    initialState,
    reducers :{
        addTocart(state,action){
            state.cart.push(action.payload)
           const token=localStorage.getItem("token")
           if(token){
            localStorage.setItem(`cart_${token}`,JSON.stringify(state.cart))
           }
            }
        ,
        removeFromcart(state,action){
           state.cart=state.cart.filter(item=>item.id!==action.payload)
           const token=localStorage.getItem("token")
           localStorage.setItem(`cart_${token}`,JSON.stringify(state.cart))

        },

    },
})
export const {addTocart,removeFromcart}=cartSlice.actions
export default cartSlice.reducer