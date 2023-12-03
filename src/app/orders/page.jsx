'use client'
import { UseGlobaleCart } from "@/contexts/cartContext";
import  {useRouter}  from "next/navigation";
import React from "react";


const Page = () => {
  const { myOrders } = UseGlobaleCart();
  const router = useRouter()
  console.log(myOrders)
  return (
    <div className="my-orders-main">
      <h1 className="text-3xl font-bold p-5">My Orders</h1>

      {myOrders.length ? (
        myOrders.map((order) => (
        
            <div key ={order._id} className="orders border p-4 rounded my-4 cursor-pointer">
             
              <b>
                <p>{order.title}</p>
              </b>
        
              <p>Txn: {order.txNum}</p>
          
            </div>
          
        ))
      ) : (
        <div className="no-order-found flex flex-col justify-center items-center">
          <h1 className="text-3xl font-bold">No Order Found</h1>
            <button onClick={()=>router.push('/')} className="go-to-shop bg-red-500 text-white py-2 px-4 rounded mt-4">
              Go to Shop
            </button>
         
        </div>
      )}
    </div>
  );
};

export default Page;
