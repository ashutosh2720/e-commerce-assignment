// contexts/CartContext.js

'use client'
import {v4 as uuid} from  'uuid'; 
import React, { createContext, useContext, useState } from 'react';
import {products} from '../../data/products'

export const CartContext = createContext();

 const CartProvider = ({ children }) => {
    const [productData,setproductData] = useState(products)
  const [cartItems, setCartItems] = useState([]);
 
  const addToCart = (product) => {
    setCartItems((prevItems) => [...prevItems, product]);
    console.log({ ...product, _id: uuid()})

  };

  const removeFromCart = (itemId) => {
    setCartItems((prevItems) => prevItems.filter((item) => item._id !== itemId));
  };

  return (
    <CartContext.Provider value={{ cartItems,productData, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};


const UseGlobaleCart = () =>useContext(CartContext);
export {UseGlobaleCart,CartProvider}
