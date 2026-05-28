import { configureStore } from'@reduxjs/toolkit'
import cartReducer from "./slice/cartslice"
import autoReducer from "./autoslice/auto"

const Store=configureStore({
    reducer:{
        cart:cartReducer,
        auto:autoReducer
    }
})
export default Store;