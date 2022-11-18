import { createSlice } from "@reduxjs/toolkit";

const cart = createSlice({
  name: 'cart',
  initialState: [],
  reducers: {
    addToCart(state, action){
      state.push(action.payload)
    }
  }
})

const {actions, reducer} = cart;
export const {addToCart} = actions;
export default reducer;