import React, { useEffect, useRef, useState } from "react";
import { FiShoppingCart } from "react-icons/fi";
import { FiX as XIcon } from 'react-icons/fi';
import 'remixicon/fonts/remixicon.css';
import { motion } from "framer-motion";
import { useCart } from './CartContext';

function Navbar() {
  const { cart } = useCart();
  const [isBodyOverflow, setIsBodyOverflow] = useState(false); 
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartEmpty, setIsCartEmpty] = useState(cart.length === 0);
  const navLinksRef = useRef(null);
  const navIconsRef = useRef(null);
  
  useEffect(() => {
    const observerOptions = { threshold: 0.1 };

    const observerCallback = (entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.classList.add('fade-in');
          }, 2500);
          observer.unobserve(entry.target);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    const elementsToObserve = [navLinksRef.current, navIconsRef.current];
    elementsToObserve.forEach(el => el && observer.observe(el));

    return () => {
      elementsToObserve.forEach(el => el && observer.unobserve(el));
    };
  }, []);

  const handleCartClick = () => {
    if (isMenuOpen) setIsMenuOpen(false);
    setIsCartOpen(prevState => !prevState);
    setIsBodyOverflow(prevState => !prevState);
    if (!isCartOpen) setIsCartEmpty(cart.length === 0);
  };

  const handleMenuClick = () => {
    if (isCartOpen) setIsCartOpen(false);
    setIsMenuOpen(prevState => !prevState);
    setIsBodyOverflow(prevState => !prevState);
  };

  useEffect(() => {
    document.body.style.overflow = isBodyOverflow ? 'hidden' : 'auto';

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isBodyOverflow]);

  

  const TextSplitter = ({ text }) => (
    <>
      {text.split('').map((char, index) => (
        <span
          key={index}
          style={{
            display: 'inline-block',
            opacity: 0,
            transform: 'translateY(20px)',
            animation: 'splitTextRise 0.5s ease-out forwards',
            animationDelay: `${index * 0.05}s`,
            ...(char === ' ' && { width: '0.5em' })
          }}
        >
          {char}
        </span>
      ))}
    </>
  );

  return (
    <>
      <header className={isMenuOpen ? 'active' : ''}>                  
        <div id="nav">
          <div id="nav-part1">
            {/* SVG or Logo can go here */}
          </div>
          <div id="nav-part2">
            <div id="links" ref={navLinksRef}>    
              <a id="about1" className={`link ${isCartOpen ? 'text-white' : 'text-black'}`} href="#">SOBRE NÓS</a>
              <a id="shop1" className={`link ${isCartOpen ? 'text-white' : 'text-black'}`} href="#">SHOP<i className="ri-arrow-right-up-line"></i></a>
              <a id="contact1" className={`link ${isCartOpen ? 'text-white' : 'text-black'}`} href="#">CONTATO</a>
            </div>
            <div id="icons" ref={navIconsRef}>
              <div className="icon-background">  
                <div className={`menu-btn cursor-pointer ${isMenuOpen ? 'active' : ''}`} onClick={handleMenuClick}>
                  <span className="line line-top" style={{ backgroundColor: (isCartOpen || isMenuOpen) ? '#FFFFFF' : '#000000' }}></span>
                  <span className="line line-bottom" style={{ backgroundColor: (isCartOpen || isMenuOpen) ? '#FFFFFF' : '#000000' }}></span>
                </div>
                <div className={`cart-icon cursor-pointer ${isCartOpen ? 'active' : ''}`} onClick={handleCartClick}>
                  {isCartOpen ? (
                    <XIcon className="cart-icon-svg" size={19} style={{ transition: 'transform 0.3s ease-in-out' }} color={(isCartOpen || isMenuOpen) ? '#FFFFFF' : '#000000'} />
                  ) : (
                    <>
                      <FiShoppingCart className="cart-icon-svg" size={19} color={(isCartOpen || isMenuOpen) ? '#FFFFFF' : '#000000'} style={{ transition: 'transform 0.3s ease-in-out' }} />
                      {/* Render green circle if cart is not empty */}
                      {isCartEmpty ? null : <div className="cart-item-count"></div>}
                    </>
                  )}
                </div>
              </div>       
            </div>
          </div>
        </div>
      </header>    
      <div className={`cart-overlay ${isCartOpen ? 'cart-overlay-active' : ''}`} onClick={handleCartClick}>
        <div className="cart-content">
          {isCartOpen && (
            <>
              {isCartEmpty ? (
                <>
                  <h2 className="h-11 cursor-pointer">Seu carrinho está vazio.</h2>
                  <button
                    onClick={() => setIsCartOpen(false)}
                    id="cart-button"
                    className="cart-button"
                  >
                    Confira o que há de melhor.
                  </button>
                  <div className="motion-container absolute inset-0 flex flex-col items-center justify-end" style={{ height: '87vh', paddingBottom: '1vh' }}>
                    <div className="text border-t-2 border-b-2 border-zinc-300 flex whitespace-nowrap overflow-hidden">
                      {[...Array(3)].map((_, index) => (
                        <motion.div
                          id="Cart-Text1"
                          key={index}
                          initial={{ x: "100%" }}
                          animate={{ x: "-100%" }}
                          transition={{ repeat: Infinity, ease: "linear", duration: 100 }}
                          className="text-[6vw] leading-none font-neue font-bold uppercase text-white"
                        >
                          CARRINHO CARRINHO CARRINHO CARRINHO CARRINHO CARRINHO
                        </motion.div>
                      ))}
                    </div>    
                    <div className="text border-zinc-300 flex whitespace-nowrap overflow-hidden">
                      {[...Array(3)].map((_, index) => (
                        <motion.div
                          id="Cart-Text2"
                          key={index}
                          initial={{ x: "-100%" }}
                          animate={{ x: "100%" }}
                          transition={{ repeat: Infinity, ease: "linear", duration: 100 }}
                          className="text-[7vw] leading-none font-neue font-bold uppercase text-white"
                        >
                          VAZIO VAZIO VAZIO VAZIO VAZIO VAZIO VAZIO VAZIO VAZIO VAZIO VAZIO VAZIO VAZIO VAZIO
                        </motion.div>
                      ))}
                    </div> 
                  </div>        
                </>
              ) : (
                <div className="cart-items">
                  {cart.map((item, index) => (
                    <div key={index} className="cart-item">
                      <div className="cart-item-details">
                        <div className="cart-item-name">{item.name}</div>
                        <div className="cart-item-quantity">Quantity: {item.quantity}</div>
                      </div>
                      <div className="cart-item-price">${item.price.toFixed(2)}</div>
                    </div>
                  ))}
                  <div className="cart-summary">
                    <div className="cart-summary-label">Total:</div>
                    <div className="cart-summary-value">
                      ${cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2)}
                    </div>
                  </div>
                  <button
                    onClick={() => setIsCartOpen(false)}
                    id="cart-button"
                    className="cart-button"
                  >
                    Checkout
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
      <div className={`menu-overlay ${isMenuOpen ? 'menu-overlay-active' : ''}`} onClick={handleMenuClick}>
        <div className="menu-content">
          {isMenuOpen && (
            <>
              <div className="menu-left">
                <div className="menu-column">
                  <h3 id="title1" className="menu-text">Connect With Us</h3>
                  <p className="menu-text1 cursor-pointer">Instagram</p>
                  <p className="menu-text1 cursor-pointer">Facebook</p>
                  <p className="menu-text1 cursor-pointer">Twitter</p>
                  <p className="menu-text1 cursor-pointer">Snapchat</p>
                </div>
                <div className="menu-column">
                  <h3 id="title2" className="menu-text">FAQ</h3>
                  <p className="menu-text2 cursor-pointer">Saiba mais sobre</p>
                  <p className="menu-text2 cursor-pointer">Sobre isso</p>
                  <p className="menu-text2 cursor-pointer">E sobre isso</p>
                </div>
                <div className="menu-column">
                  <h3 id="title3" className="menu-text3">Get Started</h3>
                  <p id="careers" className="menu-text3 cursor-pointer">Careers</p>
                </div>
              </div>
              <div className="menu-right">
                <a id="shop2" className="link" href="#"><TextSplitter text="SHOP" /><i className="ri-arrow-right-up-line"></i></a>
                <a id="contact2" className="link" href="#"><TextSplitter text="CONTATO" /></a>
                <a id="about2" className="link" href="#"><TextSplitter text="SOBRE NÓS" /></a>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default Navbar;
