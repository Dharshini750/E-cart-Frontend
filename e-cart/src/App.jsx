import React, { useState } from 'react';
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import NavBar from './components/NavBar';
import Index from './pages/Index';
import Login from './pages/User/Login';
import Signup from './pages/User/Signup';
import Home from './pages/User/Home';
import Shop from './pages/User/Shop';
import Cart from './pages/User/Cart';
import Contact from './pages/User/Contact';
import Adminlogin from './pages/Admin/Adminlogin';
import Product from './pages/Admin/Product';
import '@fortawesome/fontawesome-free/css/all.min.css';

const App = () => {
  const [cart,setCart]= useState([]);
  const [cartItems, setCartItems] = useState([]); 
  const location = useLocation();
  const showNavBar = ["/home", "/shop", "/cart", "/contact"].includes(location.pathname.toLowerCase());

 
  const addToCart = (product) => {
    setCartItems((prevItems) => [...prevItems, product]);
    alert('Added to cart ');
    setCart([...cart,product]);
  };

  
  return (
    <>
      {showNavBar && <NavBar />}
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/home" element={<Home />} />
        <Route path="/shop" element={<Shop addToCart={addToCart} />} /> 
        <Route path="/cart" element={<Cart cartItems={cartItems} />} /> 
        <Route path="/contact" element={<Contact />} />
        <Route path="/adminlogin" element={<Adminlogin />} />
        <Route path="/product" element={<Product/>} />
      </Routes>
    
    </>
  );
};

const Root = () => (
  <BrowserRouter>
    <App />
  </BrowserRouter>
);

export default Root;
