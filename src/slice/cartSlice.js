import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    cartData: {
      carts: []
    },
  },
  reducers: {
    setCart: (state, action) => {
      state.cartData = action.payload;
    }
  },
});

export const { setCart } = cartSlice.actions;
export default cartSlice.reducer;
