import React from 'react';
import './App.css';

import PromoHeader from '../components/PromoHeader';
import Header from '../components/Header';
import Home from '../pages/Home';
import Footer from '../components/Footer';

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
      <footer>
        <Footer />
      </footer>
    </div>
  );
};

export default App;