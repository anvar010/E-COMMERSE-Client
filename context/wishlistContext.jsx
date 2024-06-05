// context/wishlistContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState([]);

  const getWishlist = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) return;

      const response = await axios.get('http://localhost:8000/api/v1/user/get-wishlist', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.data.success) {
        setWishlist(response.data.data.wishlist);
      } else {
        console.error(response.data.error);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleAddToWishlist = async (productId) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) return;

      const response = await axios.post(
        'http://localhost:8000/api/v1/user/add-to-wishlist',
        { productId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success) {
        toast.success("Product added to wishlist");
        setWishlist([...wishlist, { product: { _id: productId } }]);
      } else {
        toast.error(response.data.error);
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to add product to wishlist");
    }
  };

  const handleRemoveFromWishlist = async (productId) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) return;

      const response = await axios.post(
        'http://localhost:8000/api/v1/user/remove-wishlist',
        { productId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success) {
        toast.success("Product removed from wishlist");
        setWishlist(prevWishlist => prevWishlist.filter(item => item.product._id !== productId));
      } else {
        toast.error(response.data.error);
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to remove product from wishlist");
    }
  };
  useEffect(() => {
    getWishlist();
  }, []);

  return (
    <WishlistContext.Provider value={{ wishlist, handleAddToWishlist, handleRemoveFromWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlistContext = () => useContext(WishlistContext);
