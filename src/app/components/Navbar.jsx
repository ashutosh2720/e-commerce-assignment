'use client'
import React, { useState } from 'react';
import { UseGlobaleCart } from '@/contexts/cartContext';
import Link from 'next/link';



const Navbar = () => {
  const { cartItems,myOrders } = UseGlobaleCart();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
 

  return (
    <nav className=" bg-white p-2 shadow-lg sticky top-0 px-10">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center">
        <img  className='h-[70px] cursor-pointer' src="https://dilfoods.in/wp-content/uploads/2023/04/Dil-Foods-new-logo.png" alt="" />
        </div>

        <div className="hidden sm:flex space-x-4">
          <Link href={'/cart'}><p  className="text-red-600 text-lg font-bold cursor-pointer"><span className='relative left-5 top-[-20px] bg-gray-300 rounded-full px-1'>{cartItems.length}</span> Cart</p></Link>
         
          <Link href={'/order'}> <p  className="text-red-600 text-lg font-bold cursor-pointer"><span className='relative left-5 top-[-20px] bg-gray-300 rounded-full px-1'>{myOrders.length}</span> Order</p></Link>
         
          
      
        </div>

        <div className="sm:hidden">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-red-600 focus:outline-none"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              ></path>
            </svg>
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <div className="sm:hidden mt-4">
          <a href="#" className="text-red-600 text-lg font-bold">Cart</a>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
