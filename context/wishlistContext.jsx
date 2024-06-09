import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useUserContext } from './UserContext';

const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const { user } = useUserContext();
  const [wishlist, setWishlist] = useState([]);

  const getWishlist = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token || !user) return;

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
      if (!token || !user) return;

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
      if (!token || !user) return;

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
        toast.info("Product removed from wishlist");
        setWishlist(prevWishlist => prevWishlist.filter(item => item.product._id !== productId));
      } else {
        toast.error(response.data.error);
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to remove product from wishlist");
    }
  };

  const handleRemoveSingleItemFromWishlist = async (productId) => {
    try {
      const token = localStorage.getItem('token');
      if (!token || !user) return;
      
      const response = await axios.delete(
        `http://localhost:8000/api/v1/user/remove-wishlist/${user._id}/${productId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

    //   console.log('Response:', response.data);

      if (response.data.success) {
        toast.success("Product removed from wishlist");
        setWishlist(prevWishlist => prevWishlist.filter(item => item.product._id !== productId));
      } else {
        toast.error(response.data.error);
      }
    } catch (error) {
      console.error('Error removing product from wishlist:', error);
      toast.error("Failed to remove product from wishlist");
    }
  };

  useEffect(() => {
    if (user) {
      getWishlist();
    }
  }, [user]);

  return (
    <WishlistContext.Provider value={{ wishlist, handleAddToWishlist, handleRemoveFromWishlist, handleRemoveSingleItemFromWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlistContext = () => useContext(WishlistContext);
