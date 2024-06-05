import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { useUserContext } from './UserContext'; 
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

const CartContext = createContext();

const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);
    const [initialized, setInitialized] = useState(false);
    const { user } = useUserContext(); 
    

    useEffect(() => {
        if (user) {
            setInitialized(true);
            fetchCartItems();
            console.log("user : ",user)
        }
    }, [user]);

    const fetchCartItems = async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) return;

            const response = await axios.get('http://localhost:8000/api/v1/cart/get-cart', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (response.data.success) {
                setCartItems(response.data.data.cart);
            } else {
                console.error(response.data.error);
            }
        } catch (error) {
            console.error(error);
        }
    };

    const extractProductId = (cartItem) => cartItem.product._id;

    const addToCart = async (product) => {
        try {
            if (!initialized || !user || !user._id) {
                console.error("User is not initialized correctly");
               
                return;
            }
    
            const token = localStorage.getItem('token');
            const response = await axios.post('http://localhost:8000/api/v1/cart/add-to-cart', {
                productId: product._id,
                quantity: 1,
            }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
    
            if (response.data.success) {
                fetchCartItems();
            } else {
                console.error(response.data.error);
            }
        } catch (error) {
            console.error(error);
        }
    };

    const removeItem = async (product) => {
        if (!initialized || !user || !user._id) {
            console.error("User is not initialized correctly");
            return;
        }
    
        const productId = extractProductId(product);
        const exist = cartItems.find((x) => extractProductId(x) === productId);
    
        if (!exist) {
            console.error("Product not found in cart");
            return;
        }
    
        if (exist.quantity === 1) {
            setCartItems(cartItems.filter((x) => extractProductId(x) !== productId));
    
            try {
                const token = localStorage.getItem('token');
                await axios.delete(`http://localhost:8000/api/v1/cart/remove-from-cart/${user._id}/${productId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
            } catch (error) {
                console.error("Error removing item from database:", error);
            }
        } else {
            setCartItems(cartItems.map((x) => extractProductId(x) === productId ? { ...exist, quantity: exist.quantity - 1 } : x));
    
            try {
                const token = localStorage.getItem('token');
                await axios.delete(`http://localhost:8000/api/v1/cart/decrease-quantity/${user._id}/${productId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
            } catch (error) {
                console.error("Error updating quantity in database:", error);
            }
        }
    };

    const increaseItemQuantity = async (product) => {
        if (!initialized || !user || !user._id) {
            console.error("User is not initialized correctly");
            return;
        }

        const productId = extractProductId(product);
        const exist = cartItems.find((x) => extractProductId(x) === productId);
        
        if (!exist) {
            console.error("Product not found in cart");
            return;
        }

        try {
            const token = localStorage.getItem('token');
            const response = await axios.post(`http://localhost:8000/api/v1/cart/increase-quantity/${user._id}/${productId}`, null, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (response.data.success) {
                fetchCartItems();
            } else {
                console.error(response.data.error);
            }
        } catch (error) {
            console.error("Error increasing quantity in database:", error);
        }
    };

    const clearCart = async () => {
        if (!initialized || !user || !user._id) {
            console.error("User is not initialized correctly");
            return;
        }
    
       
        if (cartItems.length >= 2) {
            confirmAlert({
                title: 'Select',
                message: 'Your cart has multiple products,Are you sure you want to clear the cart?',
                buttons: [
                    {
                        label: 'Yes',
                        onClick: async () => {
                            try {
                                const token = localStorage.getItem('token');
                                const response = await axios.delete('http://localhost:8000/api/v1/cart/clear-cart', {
                                    headers: {
                                        Authorization: `Bearer ${token}`,
                                    },
                                });
    
                                if (response.data.success) {
                                    setCartItems([]);
                                } else {
                                    console.error(response.data.error);
                                }
                            } catch (error) {
                                console.error(error);
                            }
                        }
                    },
                    {
                        label: 'No',
                        onClick: () => {}
                    }
                ]
            });
        } else {
            
            try {
                const token = localStorage.getItem('token');
                const response = await axios.delete('http://localhost:8000/api/v1/cart/clear-cart', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
    
                if (response.data.success) {
                    setCartItems([]);
                } else {
                    console.error(response.data.error);
                }
            } catch (error) {
                console.error(error);
            }
        }
    };
    


    const setQuantityToZero = async (product) => {
        try {
            if (!initialized || !user || !user._id) {
                console.error("User is not initialized correctly");
                return;
            }
    
            const productId = extractProductId(product);
            const exist = cartItems.find((x) => extractProductId(x) === productId);
            
            if (!exist) {
                console.error("Product not found in cart");
                return;
            }
    
            if (exist.quantity > 1) {
                confirmAlert({
                    title: 'Confirm to remove',
                    message: 'Are you sure you want to remove this product?',
                    buttons: [
                        {
                            label: 'Yes',
                            onClick: async () => {
                                const response = await axios.delete(`http://localhost:8000/api/v1/cart/remove-single-product/${user._id}/${productId}`, {
                                    headers: {
                                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                                    },
                                });
    
                                if (response.status === 200) {
                                    fetchCartItems();
                                } else {
                                    console.error('Error removing product from cart:', response.statusText);
                                }
                            }
                        },
                        {
                            label: 'No',
                            onClick: () => {}
                        }
                    ]
                });
            } else {
                
                const response = await axios.delete(`http://localhost:8000/api/v1/cart/remove-single-product/${user._id}/${productId}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                });
    
                if (response.status === 200) {
                    fetchCartItems();
                } else {
                    console.error('Error removing product from cart:', response.statusText);
                }
            }
        } catch (error) {
            console.error('Error removing product from cart:', error);
        }
    };
    
    
    
    

    return (
        <CartContext.Provider value={{ cartItems, addToCart, removeItem, increaseItemQuantity, clearCart,setCartItems,setQuantityToZero }}>
            {children}
        </CartContext.Provider>
    );
};

const useCartContext = () => {
    return useContext(CartContext);
};

export { CartProvider, useCartContext };
