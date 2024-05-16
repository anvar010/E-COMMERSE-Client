import { createContext, useContext, useState } from "react";

const CartContext = createContext();

const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);

    const addToCart = (product) => {
        const exist = cartItems.find((item) => item._id === product._id);

        if (exist) {
            setCartItems(
                cartItems.map((item) =>
                    item._id === product._id ? { ...exist, qty: exist.qty + 1 } : item
                )
            );
        } else {
            setCartItems([...cartItems, { ...product, qty: 1 }]);
        }
    };

    const removeItem = (product) => {
        const exist = cartItems.find((item) => item._id === product._id);

        if (exist.qty === 1) {
            setCartItems(cartItems.filter((item) => item._id !== product._id));
        } else {
            setCartItems(
                cartItems.map((item) =>
                    item._id === product._id ? { ...exist, qty: exist.qty - 1 } : item
                )
            );
        }
    };

    const clearCart = () => {
        setCartItems([]);
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
