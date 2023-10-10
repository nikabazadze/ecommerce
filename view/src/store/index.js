import { configureStore } from '@reduxjs/toolkit';
import productsReducer from './ProductsSlice';
import userReducer from './UserSlice';
import cartReducer from './CartSlice';

export const store = configureStore({
  reducer: {
    products: productsReducer,
    user: userReducer,
    cart: cartReducer
  },
});
