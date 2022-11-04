import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Cart from '../components/Cart/Cart-ui';
import Contact from '../components/common/Contact/Contact';
// import Contact from '../components/Footer/Contact';
import Dashboard from '../components/Dashboard/Dashboard-ui';
import Home from '../components/Home/Home-ui';
import Login from '../components/Login/Login-ui';
import ProductPage from '../components/ProductPage/ProductPage';
import Register from '../components/Register/Register';
import SuccessPage from '../components/SuccessPage/SuccessPage';

const PageRoutes = () => {
  return (
    <BrowserRouter>
    <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/admin/dashboard" element={<Dashboard />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/product/:productName/:productId" element={<ProductPage presentInCart={false} />} />
        <Route path="/success/session_id/:sessionId" element={<SuccessPage presentInCart={false} />} />
        <Route path="/products/:categoryId" element={<Home/>} />
        <Route path="/contact" element={<Contact/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default PageRoutes