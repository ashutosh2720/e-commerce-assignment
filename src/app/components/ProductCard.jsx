import { UseGlobaleCart } from "@/contexts/cartContext";
import Image from "next/image";
import Link from "next/link";

import React from "react";

const ProductCard = ({ product }) => {
  const { addToCart, cartItems, removeFromCart } = UseGlobaleCart();

  function addToCartHandler(e) {
    cartItems.find((item) => item._id === product._id)
      ? removeFromCart(product._id)
      : addToCart(product);
    e.stopPropagation();
  }

  return (
    <div className="bg-white h-full flex flex-col justify-between cursor-pointer p-4 rounded-lg shadow-md">
      <Link href={`/${product._id}`} className="w-full h-[200px]">
        <Image
          src={product.thumbnail}
          alt={product.title}
          width={1000}
          height={1000}
          className="w-full h-full mb-4 rounded object-contain"
        />
      </Link>
      <div className="flex flex-col justify-between h-[40%]">
        <div>
          <h2 className="text-lg font-bold mb-2">{product.title}</h2>
          <p className="text-gray-700">{product.description.slice(0, 20)}...</p>
        </div>
        <div className="flex justify-between items-center">
          <p>$ {product.price}</p>
          <p>Rating :{product.rating}</p>
        </div>
        <button
          className="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded self-center"
          onClick={addToCartHandler}
        >
          {cartItems.find((item) => item._id === product._id)
            ? "remove from cat "
            : "add to cart"}
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
