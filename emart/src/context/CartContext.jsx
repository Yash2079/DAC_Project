import React, { createContext, useContext, useState } from 'react';
import { UserContext } from './UserContext';

const CartContext = createContext();

export const useCart = () => {
  return useContext(CartContext);
};

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const { loggedIn, userType, userEpoint, setUserEpoint, setCartItemCount } = useContext(UserContext);

  let originalEpoint = userEpoint;

  const addToCart = (product) => {
    setCartItems((prevItems) => {
      const existingProduct = prevItems.find((item) => item.key === product.key);
      if (existingProduct) {
        return prevItems.map((item) =>  
          item.key === product.key
            ? { ...item, quantity: item.quantity + 1}
            : item
        );
      } else {
        return [...prevItems, { ...product, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (key) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.key !== key));
  };

  const incrementItem = (key) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.key === key 
          ? {
            ...item,
            quantity:
              item.checked
                ?  userEpoint >= 100 
                    ? (setUserEpoint(userEpoint - 100), 
                      setCartItemCount((prevCount) => prevCount + 1), 
                      console.log(item.quantity + 1),
                      item.quantity + 1) 
                    : item.quantity
                : item.quantity+1,
          }
        : item.quantity
      )
    );
  };

  const decrementItem = (key) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.key === key 
          ? {
            ...item,
            quantity:
              item.checked
                ?  userEpoint < originalEpoint 
                    ? (setUserEpoint((prevEpoints) => Math.min(prevEpoints + 100, originalEpoint)),
                      setCartItemCount((prevCount) => Math.max(prevCount - 1, 0)),
                      Math.max(item.quantity - 1, 1)) 
                    : item.quantity
                : !item.checked
                ? Math.max(item.quantity - 1, 1)
                : item.quantity,
          }
        : item.quantity
      )
    );
  };

  const value = {
    cartItems,
    addToCart,
    removeFromCart,
    incrementItem,
    decrementItem,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
