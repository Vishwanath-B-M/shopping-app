import { createSlice } from "@reduxjs/toolkit";

const initialState = { cart: [] };

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addTocart(state, action) {
      state.cart = action.payload;
    },
    removeFromcart(state, action) {
      state.cart = state.cart.filter((item) => item.productId !== action.payload);
    },
    clearCart(state) {
      state.cart = [];
    },
  },
});

export const { addTocart, removeFromcart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;