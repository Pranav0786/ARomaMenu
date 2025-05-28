// context/CartContext.tsx
import React, { createContext, useState } from "react";
import axios from "axios";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);
    const [totalAmount, setTotalAmount] = useState(0);

    const addToCart = (food) => {
        setCartItems((prevItems) => {
            const index = prevItems.findIndex(item => item.food._id === food._id);
            if (index !== -1) {
                const updatedItems = [...prevItems];
                updatedItems[index].quantity += 1;
                return updatedItems;
            }
            return [...prevItems, { food, quantity: 1 }];
        });
        setTotalAmount((prevTotal) => prevTotal + food.price);
    };

    const placeOrder = async () => {
        try {
            const userId = "UserID"; // Replace with actual user ID
            await axios.post("http://YOUR_BACKEND_IP:PORT/api/orders/create", {
                userId: userId,
                cartItems: cartItems.map(item => ({
                    food: item.food._id,
                    quantity: item.quantity
                })),
                totalAmount,
            });
            setCartItems([]);
            setTotalAmount(0);
            alert("Order placed successfully!");
        } catch (error) {
            console.error(error);
            alert("Failed to place order");
        }
    };

    return (
        <CartContext.Provider value={{ cartItems, totalAmount, addToCart, placeOrder }}>
            {children}
        </CartContext.Provider>
    );
};
