'use client'
import React, { useState } from 'react';
import { UseGlobaleCart } from '@/contexts/cartContext';
import { useRouter } from "next/navigation";


const Navbar = () => {
  const { cartItems } = UseGlobaleCart();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();

  return (
    <nav className=" bg-white p-2 shadow-lg sticky top-0 px-10">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <a href="#" className="text-red-600 text-lg font-bold"><img className='h-[70px]' src="https://dilfoods.in/wp-content/uploads/2023/04/Dil-Foods-new-logo.png" alt="" /></a>
        </div>

        <div className="hidden sm:flex space-x-4">
         
          <p onClick={()=>router.push('/cart')} className="text-red-600 text-lg font-bold cursor-pointer">{cartItems?.length} Cart</p>
      
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
