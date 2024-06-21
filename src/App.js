import React from 'react';
import Header from './components/header';
import Hero from './components/hero';
import Square from './components/squares';
import Footer from './components/footer';
import Shop from './components/shop';
import { CartProvider } from './components/CartContext';

const App = () => (
  <CartProvider>
    <div className="font-sans">
      <Header />
      <Shop />
    </div>
  </CartProvider>
);

export default App;
