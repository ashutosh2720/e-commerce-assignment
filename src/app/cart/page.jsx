"use client";
import React, { useState } from "react";
import { UseGlobaleCart } from "@/contexts/cartContext";
import Image from "next/image";
import Link from "next/link";

const Page = () => {
  const { cartItems, removeFromCart, cartQuantities, setCartQuantities } =
    UseGlobaleCart();

  const handleIncrementQuantity = (itemId) => {
    setCartQuantities((prevQuantities) => ({
      ...prevQuantities,
      [itemId]: (prevQuantities[itemId] || 0) + 1,
    }));
  };

  const handleDecrementQuantity = (itemId) => {
    setCartQuantities((prevQuantities) => ({
      ...prevQuantities,
      [itemId]: Math.max((prevQuantities[itemId] || 0) - 1, 0),
    }));
  };

  const calculateTotalPrice = () => {
    return cartItems.reduce((total, item) => {
      const itemPrice = parseFloat(item.price) || 0;
      const itemQuantity = cartQuantities[item.id] || 0;

      return total + itemPrice * itemQuantity;
    }, 0);
  };

  return (
    <div className="min-h-screen w-full flex flex-col flex-wrap items-center justify-center p-4">
      <h1 className="text-3xl font-bold text-start mb-8">Shopping Cart</h1>
      {cartItems.length === 0 ? (
        <>
          <span className="text-gray-600 text-3xl">Your cart is empty.</span>
          <Link href={"/"}>
            <button className="go-to-shop bg-red-500 text-white py-2 px-4 rounded mt-4">
              Go to Shop
            </button>
          </Link>
        </>
      ) : (
        <div className="w-full">
          {/* Cart Items */}
          <div className="flex flex-wrap -mx-2">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="w-full md:w-1/2 lg:w-1/3 xl:w-1/4 px-2 mb-20"
              >
                <div className="bg-white h-[110%] flex flex-col p-4 rounded-lg shadow-lg">
                  <Image
                    src={item.thumbnail}
                    alt={item.title}
                    width={1000}
                    height={1000}
                    className="w-full h-[70%] mb-4 rounded object-cover"
                  />
                  <div className="flex flex-col justify-between h-20">
                    <div>
                      <h2 className="text-lg font-bold mb-2">{item.title}</h2>
                      <p className="text-gray-700">
                        {item.description.slice(0, 20)}...
                      </p>
                    </div>
                    <div className="flex justify-between items-center mt-2">
                      <div className="flex items-center">
                        <button
                          onClick={() => handleDecrementQuantity(item.id)}
                          className="bg-gray-200 text-gray-700 py-1 px-2 rounded"
                        >
                          -
                        </button>
                        <p className="mx-2">{cartQuantities[item.id] || 0}</p>
                        <button
                          onClick={() => handleIncrementQuantity(item.id)}
                          className="bg-gray-200 text-gray-700 py-1 px-2 rounded"
                        >
                          +
                        </button>
                      </div>
                      <div className="flex items-center">
                        <p className="mx-4">
                          $ {item.price * (cartQuantities[item.id] || 0)}
                        </p>
                        <button
                          onClick={() => removeFromCart(item._id)}
                          className="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Checkout Card (Fixed Bottom Right) */}
          <div className="w-full md:w-1/4 fixed bottom-0 right-0 mb-0 px-2">
            <div className="bg-white p-4 rounded-lg shadow-md">
              <h2 className="text-xl font-bold mb-4">Checkout</h2>
              <div className="flex justify-between items-center mb-4">
                <p className="text-gray-700">Total:</p>
                <p className="font-bold">$ {calculateTotalPrice()}</p>
              </div>
              <Link
                href={"/checkout"}
                className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded w-full"
              >
                Checkout
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Page;
