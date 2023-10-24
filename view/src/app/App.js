import React from 'react';
import { useEffect } from 'react';
import { useDispatch } from "react-redux";
import { RouterProvider, createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom';

import './App.css';
import Root from '../components/Root';
import Home from '../pages/Home';
import Shop from '../pages/Shop';
import Product from '../pages/Product';
import Cart from '../pages/Cart';
import Account from '../pages/Account';
import Auth from '../pages/Auth';
import CheckoutWrapper from '../components/CheckoutWrapper';

import { loadProducts } from '../store/ProductsSlice';
import { getCurrentUser } from '../API';
import { setUser, setIsLoggedIn } from '../store/UserSlice';
import { loadUserCart, loadGuestCart } from '../store/CartSlice';
import { loadUserOrders } from '../store/OrdersSlice';

const router = createBrowserRouter(createRoutesFromElements(
  <>
    <Route path='/' element={ <Root /> } >
      <Route path='/' element={ <Home /> } />
      <Route path='shop' element={ <Shop /> } />
      <Route path='cart' element={ <Cart /> } />
      <Route path='account' element={ <Account /> } />
      <Route path='account/:action' element={ <Auth /> } />
      <Route path='products/:id' element={ <Product /> } />
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