// contexts/CartContext.js

"use client";
import { v4 as uuid } from "uuid";

import React, { createContext, useContext, useReducer, useState } from "react";
import { products } from "../../data/products";
import { useRouter } from "next/navigation";

export const CartContext = createContext();

const CartProvider = ({ children }) => {
  const [productData, setproductData] = useState(products);
  const [cartItems, setCartItems] = useState([]);
  const [cartQuantities, setCartQuantities] = useState({});
  const [addresses, setAddresses] = useState([]);
  const [editIndex, setEditIndex] = useState(-1);
  const [myOrders, setMyOrders] = useState([]);

  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    pinCode: "",
    city: "",
    address: "",
    isAddressSelected: false,
  });

  const router = useRouter();

  const editAddress = (index) => {
    setEditIndex(index);
    const addressToEdit = addresses[index];
    setFormData({
      name: addressToEdit.name,
      mobile: addressToEdit.mobile,
      pinCode: addressToEdit.pinCode,
      city: addressToEdit.city,
      address: addressToEdit.address,
    });
  };
  const addAddress = (e) => {
    e.preventDefault();
    setAddresses([...addresses, formData]);
    setFormData({
      name: "",
      mobile: "",
      pinCode: "",
      city: "",
      address: "",
      isAddressSelected: false,
    });
    {
      cartArray.length !== 0 && navigate("checkout");
    }
  };

  const deleteAddress = (index) => {
    const updatedAddresses = [...addresses];
    updatedAddresses.splice(index, 1);
    setAddresses(updatedAddresses);
  };

  const saveAddress = (e) => {
    e.preventDefault();
    const updatedAddresses = [...addresses];
    updatedAddresses[editIndex] = formData;
    setAddresses(updatedAddresses);
    setFormData({
      name: "",
      mobile: "",
      pinCode: "",
      city: "",
      address: "",
      isAddressSelected: false,
    });
    setEditIndex(-1);
    {
      cartItems.length !== 0 && router.push("checkout");
    }
  };

  const selectAddress = (ind) => {
    setAddresses((Adresses) =>
      Adresses.map((address, index) =>
        index === ind
          ? { ...address, isAddressSelected: true }
          : { ...address, isAddressSelected: false }
      )
    );
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const addToCart = (product) => {
    setCartItems((prevItems) => [...prevItems, { ...product, qnt: 1 }]);
  };

  const incrementQnt = (id) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item._id === id ? { ...item, qnt: item.qnt ?? 0 + 1 } : item
      )
    );
  };

  const decrementQnt = (id) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item._id === id
          ? { ...item, qnt: item.qnt === 0 ? item.qnt : item.qnt - 1 }
          : item
      )
    );
  };

  const removeFromCart = (itemId) => {
    setCartItems((prevItems) =>
      prevItems.filter((item) => item._id !== itemId)
    );
  };

  const calculateTotalPrice = () => {
    return cartItems.reduce((total, item) => {
      const itemPrice = parseFloat(item.price) || 0;
      const itemQuantity = cartQuantities[item.id] || 0;

      return total + itemPrice * itemQuantity;
    }, 0);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        productData,
        setCartItems,
        addToCart,
        removeFromCart,
        editAddress,
        addAddress,
        deleteAddress,
        selectAddress,
        handleInputChange,
        saveAddress,
        formData,
        calculateTotalPrice,
        cartQuantities,
        setCartQuantities,
        myOrders,
        setMyOrders,
        incrementQnt,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

const UseGlobaleCart = () => useContext(CartContext);
export { UseGlobaleCart, CartProvider };
