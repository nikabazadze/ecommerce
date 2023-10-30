import { configureStore } from '@reduxjs/toolkit';
import userReducer from './UserSlice';
import cartReducer from './CartSlice';
import ordersReducer from './OrdersSlice';
import searchReducer from './SearchSlice';
import productsReducer from './ProductsSlice';

export const store = configureStore({
  reducer: {
    products: productsReducer,
    user: userReducer,
    cart: cartReducer,
    orders: ordersReducer,
    search: searchReducer
  },
});
