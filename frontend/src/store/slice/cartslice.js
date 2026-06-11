import { createSlice } from '@reduxjs/toolkit';
const initialState={cart: []}
const cartSlice=createSlice({
    name:'cart',
    initialState,
    reducers :{
        addTocart(state,action){
            state.cart.push(action.payload)
            }
        ,
        removeFromcart(state,action){
           state.cart=state.cart.filter(item=>item.id!==action.payload)
        },

    },
})
export const {addTocart,removeFromcart}=cartSlice.actions
export default cartSlice.reducer