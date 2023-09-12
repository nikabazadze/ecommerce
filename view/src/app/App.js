import React from 'react';
import './App.css';

import PromoHeader from '../components/PromoHeader';
import Header from '../components/Header';
import Home from '../pages/Home';

function App() {
  return (
    <div>
      <header>
        <PromoHeader />
        <Header />
      </header>
      <Home />
    </div>
  );
}

export default App;