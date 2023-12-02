import { UseGlobaleCart } from "@/contexts/cartContext";
import { useRouter } from "next/navigation";
import React from "react";


const ProductCard = ({ product }) => {
  const { productData, addToCart, cartItems, removeFromCart } =
    UseGlobaleCart();

    const router = useRouter();

    function addToCartHandler(e){
        cartItems.find((item) => item._id === product._id)
        ? removeFromCart(product._id)
        : addToCart(product)
        e.stopPropagation()
    }

  return (
    <div onClick={()=>router.push(`/${product._id}`)} className="bg-white h-full flex flex-col justify-between p-4 rounded-lg shadow-md">
      <img
        className="w-full h-[60%] mb-4 rounded object-cover"
        src={product.thumbnail}
        alt={product.name}
      />
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
