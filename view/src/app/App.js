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

import { loadProducts } from '../store/ProductsSlice';

const router = createBrowserRouter(createRoutesFromElements(
  <Route path='/' element={ <Root /> } >
    <Route path='/' element={ <Home /> } />
    <Route path='shop' element={ <Shop /> } />
    <Route path='cart' element={ <Cart /> } />
    <Route path='products/:id' element={ <Product /> } />
  </Route>
));

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadProducts());
  }, [dispatch]);

  return (
    <RouterProvider router={ router } />
  );
};

export default App;