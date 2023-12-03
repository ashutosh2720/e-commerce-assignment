"use client";
import { UseGlobaleCart } from "@/contexts/cartContext";
import Image from "next/image";
import React from "react";

const Page = ({ params: { productId } }) => {
  const { productData, cartItems, addToCart, removeFromCart } =
    UseGlobaleCart();
  const singleProduct = productData.find(
    (product) => product._id === productId
  );
  function addToCartHandler(e) {
    cartItems.find((item) => item._id === singleProduct._id)
      ? removeFromCart(singleProduct._id)
      : addToCart(singleProduct);
    e.stopPropagation();
  }
  return (
    <div className="max-h-screen flex items-center justify-center p-4">
      <div className="max-w-2xl w-full bg-white p-8 rounded-lg shadow-md flex">
        <div className="flex-shrink-0 w-48 md:w-64 lg:w-96 xl:w-96">
          <div className="relative w-[250px] h-38 sm:h-64 md:h-80 lg:h-96 xl:h-96 mb-4">
            <Image
              src={singleProduct?.thumbnail}
              alt={singleProduct?.title}
              width={100}
              height={100}
              layout="responsive"
              className="rounded"
            />
          </div>
        </div>

        <div className="flex-grow ml-4">
          <h1 className="text-3xl font-bold mb-2">{singleProduct.title}</h1>
          <h1 className="text-2xl font mb-2">
            <span className="text-2xl">Brand:</span>
            {singleProduct?.brand}
          </h1>
          <p className="text-gray-700 mb-4">
            Description : {singleProduct?.description}
          </p>
          <p className="text-lg font-bold">Rating : {singleProduct?.rating}</p>

          <div className="flex items-center justify-between mb-4">
            <p className="text-lg font-bold">
              Price : $ {singleProduct?.price}/-
            </p>
          </div>
          <button
            className="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded self-center"
            onClick={addToCartHandler}
          >
            {cartItems.find((item) => item._id === singleProduct?._id)
              ? "remove from cat "
              : "add to cart"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Page;
