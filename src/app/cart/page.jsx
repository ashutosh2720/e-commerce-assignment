'use client'
import React from 'react';
import { UseGlobaleCart } from '@/contexts/cartContext';

const page   = () => {
  const { cartItems } = UseGlobaleCart();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>

      {cartItems.length === 0 ? (
        <p className="text-gray-600">Your cart is empty.</p>
      ) : (
        <div className="max-w-5xl w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="bg-white flex flex-col p-4 rounded-lg shadow-md"
            >
              <img
                className="w-full h-[60%] mb-4 rounded object-cover"
                src={item.thumbnail}
                alt={item.name}
              />
              <div className="flex flex-col justify-between h-[40%]">
                <div>
                  <h2 className="text-lg font-bold mb-2">{item.title}</h2>
                  <p className="text-gray-700">
                    {item.description.slice(0, 20)}...
                  </p>
                </div>
                <div className="flex justify-between items-center">
                  <p>$ {item.price}</p>
                  <button className="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded">
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default page ;

