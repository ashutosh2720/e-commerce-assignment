'use client'
import { UseGlobaleCart } from '@/contexts/cartContext';
import React from 'react'
import ProductCard from './ProductCard';

const ProductListing = () => {
    const { productData,addToCart,cartItems,removeFromCart } = UseGlobaleCart();

  return (
    <div className="max-w-7xl w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {productData.map((product) => (
          <ProductCard key={product._id} product={product}  />
        ))}
      </div>
  )
}

export default ProductListing
