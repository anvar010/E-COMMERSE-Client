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
import { useUserContext } from '../context/userContext'; // Adjusted import path
import axios from 'axios';

function App() {
  const { user, setUser } = useUserContext(); // Use the user context

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
          console.log("API response:", res.data);
          if (res.data.success) {
            setUser(res.data.data);
            console.log("User data set:", res.data.data);
            // const userId =  res.data.data.user._id;
            
          } else {
            console.log("User data fetch failed, clearing localStorage");
            localStorage.clear();
          }
        } catch (error) {
          console.error("Error initializing user:", error);
          localStorage.clear();
        }
      }
    };

    initializeUser();
  }, [setUser]);

  return (
    <>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/addproduct' element={<ProtectedRoute><AddProduct /></ProtectedRoute>} />
        <Route path='/products' element={<ProtectedRoute><Products /></ProtectedRoute>} />
        <Route path='/profile' element={<ProtectedRoute><Profile /></ProtectedRoute>} />
        <Route path='/products/:id' element={<ProtectedRoute><ProductPage /></ProtectedRoute>} />
        <Route path='/viewcart' element={<ProtectedRoute><ViewCart /></ProtectedRoute>} />
        <Route path='/success' element={<ProtectedRoute><Success /></ProtectedRoute>} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
