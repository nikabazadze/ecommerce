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
      <main>
        <Home />
      </main>
    </div>
  );
}

export default App;