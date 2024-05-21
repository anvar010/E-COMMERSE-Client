import { createContext, useContext, useState, useEffect } from "react";
import { useUserContext } from "./userContext";
import axios from "axios";

const CartContext = createContext();

const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);
    const { user, setUser } = useUserContext();
    const [initialized, setInitialized] = useState(false);

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
                        setUser(res.data.data.user);
                        console.log("userId : ", res.data.data.user);
                        setInitialized(true);
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

    useEffect(() => {
        if (initialized) {
            fetchCartItems();
        }
    }, [initialized]);

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
                console.log("cart : ", response.data.data.cart);
            } else {
                console.error(response.data.error);
            }
        } catch (error) {
            console.error(error);
        }
    };

    const extractProductId = (cartItem) => {
        return cartItem.product._id;
    };

    const addToCart = async (product) => {
        if (!initialized || !user || !user._id) {
            console.error("User is not initialized correctly");
            return;
        }

        try {
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
        console.log("prod Id : ", productId);

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
                console.log("Item removed for user : ", user._id);
            } catch (error) {
                console.error("Error removing item from database:", error);
            }
        } else {
            setCartItems(cartItems.map((x) => extractProductId(x) === productId ? { ...exist, quantity: exist.quantity - 1 } : x));

            try {
                const token = localStorage.getItem('token');
                console.log("Sending decrease quantity request with token:", token);
                await axios.delete(`http://localhost:8000/api/v1/cart/decrease-quantity/${user._id}/${productId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                console.log("Quantity decreased for user : ", user._id);
            } catch (error) {
                console.error("Error updating quantity in database:", error);
            }
        }
    };

    const clearCart = async () => {
        if (!initialized || !user || !user._id) {
            console.error("User is not initialized correctly");
            return;
        }

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
    };

    return (
        <CartContext.Provider value={{ cartItems, addToCart, removeItem, clearCart }}>
            {children}
        </CartContext.Provider>
    );
};

const useCartContext = () => {
    return useContext(CartContext);
};

export { CartProvider, useCartContext };
