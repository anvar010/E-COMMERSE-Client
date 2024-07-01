import { useState, useEffect } from 'react';
import './App.css';
import Navbar from './Shared/Navbar';
import Home from './pages/Home';
import Footer from './Shared/Footer';
import { Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import ProtectedRoute from './pages/ProtectedRoute';

import Products from './pages/Products';
import ProductPage from './pages/ProductPage';
import Profile from './pages/Profile';
import AddProduct from './pages/seller/AddProduct';
import ViewCart from './pages/ViewCart';
import Success from './pages/Success';
import { useUserContext } from '../context/userContext'; 
import axios from 'axios';
import YourOrder from './pages/BuyNow';
import ProductListByUser from './pages/MyProduct';
import EditPage from './pages/EditPage';
import SpecialOffers from './component/SpecialOffers';
import ViewWishlist from './pages/Wishlist';
import Buy from './pages/Buy';
import MyOrders from './pages/MyOrders';
import ForgotPassword from './pages/ForgotPassword';
import ResetPasswordForm from './pages/ResetPassword';
import AdminPage from './pages/admin.jsx/Dashboard';

import AdminLoginPage from './pages/admin.jsx/AdminLoginPage';
import ShowProductPage from './pages/admin.jsx/ShowProduct';
import ProductsBySellerDetails from './pages/ProductlistBySellerDetails';


function App() {
  const { user, setUser } = useUserContext();

  useEffect(() => {
    const initializeUser = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          console.log("Fetching user data...");
          const res = await axios.post(
            "http://localhost:8000/api/v1/user/get-user",
            { token },
            {
              headers: {
                Authorization: `Bearer ${token}`
              }
            }
          );
          // console.log("API response:", res.data);
          if (res.data.success) {
            setUser(res.data.data);
            // console.log("User data set:", res.data.data);
            // const userId =  res.data.data.user._id;

          } else {
            console.log("User data fetch failed, clearing localStorage");
            // localStorage.clear();
          }
        } catch (error) {
          console.error("Error initializing user:", error);
          localStorage.clear();
        }
      }
    };

    initializeUser();
  }, [setUser]);
  const shouldDisplayNavbarAndFooter = !(
    location.pathname.startsWith('/admin')
  );


  return (
    <>
      {shouldDisplayNavbarAndFooter && <Navbar />}
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/addproduct' element={<ProtectedRoute><AddProduct /></ProtectedRoute>} />
        <Route path='/products' element={<ProtectedRoute><Products /></ProtectedRoute>} />
        <Route path='/profile' element={<ProtectedRoute><Profile /></ProtectedRoute>} />
        <Route path='/products/:id' element={<ProductPage />} />
        <Route path='/viewcart' element={<ProtectedRoute><ViewCart /></ProtectedRoute>} />
        <Route path='/success' element={<ProtectedRoute><Success /></ProtectedRoute>} />
        <Route path='/buynow' element={<ProtectedRoute><YourOrder /></ProtectedRoute>} />
        <Route path='/buynow/:id' element={<ProtectedRoute><Buy /></ProtectedRoute>} />

        <Route path='/productlist/:id' element={<ProtectedRoute><ProductListByUser /></ProtectedRoute>} />
        <Route path='/editproduct/:id' element={<ProtectedRoute><EditPage /></ProtectedRoute>} />
        <Route path='/offer-to-day' element={<ProtectedRoute><SpecialOffers /></ProtectedRoute>} />
        <Route path='/wishlist' element={<ProtectedRoute><ViewWishlist /></ProtectedRoute>} />
        <Route path='/myorders' element={<ProtectedRoute><MyOrders /></ProtectedRoute>} />
        <Route path='/reset-password/:token' element={<ResetPasswordForm />} />
        <Route path='/forgot-password' element={<ForgotPassword />} />

        <Route path='/admin' element={<AdminPage />} />
      
      <Route path='/admin-login' element={<AdminLoginPage />} />
      <Route path='/admin-products/:id' element={<ShowProductPage />} />
      <Route path='/getproductBySeller/:sellerId' element={<ProductsBySellerDetails />} />
      </Routes>
      
      {shouldDisplayNavbarAndFooter && <Footer />}
      
    </>
  );
}

export default App;
