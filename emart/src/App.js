// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage/HomePage';
import SignUpPage from './pages/SignPage/SignUpPage';
import SignInPage from './pages/SignPage/SignInPage';
import ProfilePage from './pages/ProfilePage/ProfilePage';
import ShoppingCartPage from './pages/ShoppingCart/ShoppingCart';
import FavoritePage from './pages/FavoritePage/FavoritePage';
import ProductPage from './pages/ProductPage/ProductPage';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import ProductAllPage from './pages/ProductAllPage/ProductAllPage';
import ThankYou from './components/ThankYou/ThankYou';
import './i18n'; // Make sure this is correct

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<SignUpPage />} /> 
        <Route path="/signin" element={<SignInPage />} /> 
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/shoppingcart" element={<ShoppingCartPage />} />
        <Route path="/favorite" element={<FavoritePage />} />
        <Route path="/products/:subcategoryid" element={<ProductAllPage />} />
        <Route path="/product/:productId" element={<ProductPage />} />
        <Route path='/thankyou' element={<ThankYou />} />
      </Routes>
    </Router>
  );
}

export default App;
