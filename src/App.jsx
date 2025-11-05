import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import ProductsPage from './pages/ProductsPage';
import ProductDetails from './pages/ProductDetails';
import About from './pages/About';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import AddProduct from './pages/AddProduct';

const App = () => {
  const [cart, setCart] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  const addToCart = (product, quantity = 1) => {
    const existingItem = cart.find(item => item.id === product.id);
    if (existingItem) {
      setCart(cart.map(item =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + quantity }
          : item
      ));
    } else {
      setCart([...cart, { ...product, quantity }]);
    }
  };

  const removeFromCart = (productId) => {
    setCart(cart.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId);
    } else {
      setCart(cart.map(item =>
        item.id === productId ? { ...item, quantity } : item
      ));
    }
  };

  const clearCart = () => {
    setCart([]);
  };

  const handleLogin = (userData) => {
    setIsLoggedIn(true);
    setUser(userData);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUser(null);
  };

  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Navbar 
          cartCount={cart.reduce((sum, item) => sum + item.quantity, 0)}
          isLoggedIn={isLoggedIn}
          user={user}
          onLogout={handleLogout}
        />
        <main className="grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<ProductsPage addToCart={addToCart} />} />
            <Route path="/product/:id" element={<ProductDetails addToCart={addToCart} />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login onLogin={handleLogin} />} />
            <Route path="/signup" element={<Signup onSignup={handleLogin} />} />
            <Route path="/cart" element={
              <Cart 
                cart={cart}
                updateQuantity={updateQuantity}
                removeFromCart={removeFromCart}
              />
            } />
            <Route path="/checkout" element={
              <Checkout 
                cart={cart}
                clearCart={clearCart}
              />
            } />
            <Route path="/add-product" element={
              isLoggedIn ? <AddProduct /> : <Navigate to="/login" />
            } />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;