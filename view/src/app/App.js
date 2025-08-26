import React from 'react';
import { useEffect } from 'react';
import { useDispatch } from "react-redux";
import { RouterProvider, createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom';

import './App.css';
import Root from '../layouts/Root';
import Home from '../pages/Home';
import Shop from '../pages/Shop';
import Auth from '../pages/Auth';
import Account from '../pages/Account';
import Product from '../pages/Product';
import OrderConfirm from '../pages/OrderConfirm';
import CheckoutWrapper from '../components/CheckoutWrapper';

import { getCurrentUser } from '../API';
import { loadUserOrders } from '../store/OrdersSlice';
import { loadProducts } from '../store/ProductsSlice';
import { setUser, setIsLoggedIn } from '../store/UserSlice';
import { loadUserCart, loadGuestCart } from '../store/CartSlice';

const router = createBrowserRouter(createRoutesFromElements(
  <>
    <Route path='/' element={ <Root /> } >
      <Route path='/' element={ <Home /> } />
      <Route path='shop' element={ <Shop /> } />
      <Route path='account' element={ <Account /> } />
      <Route path='account/:action' element={ <Auth /> } />
      <Route path='products/:id' element={ <Product /> } />
      <Route path='orderConfirm' element={<OrderConfirm /> } />
    </Route>
    <Route path='checkout' element={ <CheckoutWrapper /> } />
  </>
));

function App() {
  const dispatch = useDispatch();

  // Loads all products
  useEffect(() => {
    dispatch(loadProducts());
  }, [dispatch]);

  // Checks if current site visitor is authorized user
  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      try {
        const response = await getCurrentUser();
        if (!isMounted) return;
  
        if (response.isAuthenticated) {
          dispatch(setUser(response.user));
          dispatch(setIsLoggedIn(true));
          dispatch(loadUserCart(response.user.id));
          dispatch(loadUserOrders(response.user.id));
        } else {
          dispatch(setIsLoggedIn(false));
          dispatch(setUser(null));

          const guestCart = JSON.parse(localStorage.getItem('guestCart') || '{}');
          if (Object.keys(guestCart).length > 0) dispatch(loadGuestCart(guestCart));
        }
      } catch (error) {
        console.error("Error fetching current user:", error);
      }
    };
  
    fetchData();
  
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <RouterProvider router={ router } />
  );
};

export default App;