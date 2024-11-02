import React, { useState } from 'react';
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import NavBar from './components/NavBar';
import Home from './pages/Home';
import Login from './pages/User/Login';
import Signup from './pages/User/Signup';
import Shop from './pages/User/Shop';
import Cart from './pages/User/Cart';
import Contact from './pages/User/Contact';
import Adminlogin from './pages/Admin/Adminlogin';
import Product from './pages/Admin/Product';
import UserPage from './pages/User/Userpage';
import Checkout from './pages/User/Checkout';
import Payment from './pages/User/Payment'
import '@fortawesome/fontawesome-free/css/all.min.css';

const App = () => {
  const [cartItems, setCartItems] = useState([]);
  const [products, setProducts] = useState();
  const location = useLocation();
  const [userInfo, setUserInfo] = useState(null); 
  const [user, setUser] = useState(null);

  const addToCart = (product) => {
    setCartItems((prevItems) => {
      const existingProduct = prevItems.find((item) => item.id === product.id);
      if (existingProduct) {
        return prevItems.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        return [...prevItems, { ...product, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (productId) => {
    setCartItems((prevItems) => prevItems.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId, quantity) => {
    setCartItems((prevItems) =>
      prevItems.map(item =>
        item.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const handleUserLogin = (userData) => {
    setUserInfo(userData); 
  };

  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login onLogin={handleUserLogin} />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/shop" element={<Shop addToCart={addToCart} products={products} />} />
        <Route path="/cart" element={<Cart cartItems={cartItems} removeFromCart={removeFromCart} updateQuantity={updateQuantity} />} />
        <Route path="/checkout" element={<Checkout cartItems={cartItems} setProducts={setProducts} />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/adminlogin" element={<Adminlogin />} />
        <Route path="/product" element={<Product />} />
        <Route path="/user" element={<UserPage userInfo={userInfo} />} />
        <Route path="/" element={<Login setUser={setUser} />} />
        <Route path="/userpage" element={<UserPage username={user} />} />
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
