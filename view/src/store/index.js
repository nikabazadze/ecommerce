import { configureStore } from '@reduxjs/toolkit';
import productsReducer from './ProductsSlice';
import userReducer from './UserSlice';

export const store = configureStore({
  reducer: {
    products: productsReducer,
    user: userReducer
  },
});
