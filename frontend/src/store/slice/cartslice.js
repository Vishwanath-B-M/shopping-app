import { createSlice } from '@reduxjs/toolkit';

const token=cookieStore.get("token")


const initialState={
    cart:JSON.parse(await cookieStore.get(`cart_${token}`))||[],
   
    
}
const cartSlice=createSlice({
    name:'cart',
    initialState,
    reducers :{
        addTocart(state,action){
            state.cart.push(action.payload)
           const token=cookieStore.get("token")
           if(token){
            localStorage.setItem(`cart_${token}`,JSON.stringify(state.cart))
           }
            }
        ,
        removeFromcart(state,action){
           state.cart=state.cart.filter(item=>item.id!==action.payload)
           const token=cookieStore.get("token")
           cookieStore.set(`cart_${token}`,JSON.stringify(state.cart))

        },

    },
})
export const {addTocart,removeFromcart}=cartSlice.actions
export default cartSlice.reducer