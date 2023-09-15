import React from 'react';
import { RouterProvider, createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom';

import './App.css';
import Root from '../components/Root';
import Home from '../pages/Home';
import Shop from '../pages/Shop';

const router = createBrowserRouter(createRoutesFromElements(
  <Route path='/' element={ <Root /> } >
    <Route path='/' element={ <Home /> } />
    <Route path='/shop' element={ <Shop /> } />
  </Route>
));

function App() {
  return (
    <RouterProvider router={ router } />
  );
};

export default App;