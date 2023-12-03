'use client'
import { UseGlobaleCart } from '@/contexts/cartContext'
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react'


const Page = () => {
    const {addresses,setMyOrders,calculateTotalPrice,selectAddress,cartItems,setCartItems, editAddress, deleteAddress} = UseGlobaleCart()
    const selectedAddress = addresses?.find((address) => address.isAddressSelected)
    const router = useRouter()

    const totalPrice = calculateTotalPrice()
    
// console.log(addresses)
    useEffect(() => {
        const script = document.createElement("script");
        script.src = "https://checkout.razorpay.com/v1/checkout.js";
        script.async = true;
        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script);
        };
    }, []);

    const handlePaymentSuccess = (payment) => {
        console.log("Payment Successful:", payment);
        // Perform necessary actions after successful payment  \
        // notifySuccess('order successfully placed')
        cartItems.map((product) => setMyOrders((prev) => [...prev, { id: product._id, title: product.title, quantity: product.qty, price: product.price * product.qty, address: selectedAddress, txNum: payment.razorpay_payment_id }]))
        router.push('/orders')
        setCartItems([])
    };

    const handlePaymentError = (error) => {
        console.log("Payment Error:", error);
        // Handle payment errors
    };


    const makePayment = async () => {
        // if (selectedAddress) {
        //     // notifyWarn('Choose an Address')
        //     return;
        // }
        const options = {
            key: "rzp_test_XrHX89PF7nW09C",
            amount: totalPrice * 100,
            currency: "INR",
            name: "AnixCart",
            description: "Thank you for your test purchase",
            image: '',
            handler: handlePaymentSuccess,
            prefill: {
                name: '',
                email: '',
                contact: ''
            },
            notes: {
                address: ''
            },
            theme: {
                color: "#0C2340"
            }
        };
        // window.RazorpayCheckout.open(options);
        const razorpayInstance = new window.Razorpay(options);
        razorpayInstance.on('payment.failed', handlePaymentError);
        razorpayInstance.open();
    };

  return (

   
        <div className='main-checkout flex flex-wrap md:flex-nowrap justify-between'>
          {/* Address Section */}
          <div className="address w-full md:w-1/2 lg:w-1/3 xl:w-1/4 mb-4 md:mb-0">
            <h1 className="text-2xl font-bold mb-4">Address</h1>
            <button
              className='add-new-address bg-red-500 text-white py-2 px-4 rounded mb-4'
              onClick={() => { router.push('/address') }}
            >
              Add New Address
            </button>
            {addresses?.map((address, index) => (
              <div
                key={index}
                className='addres border p-4 rounded mb-4 cursor-pointer'
                onClick={() => selectAddress(index)}
                style={{
                  backgroundColor: address.isAddressSelected ? '#E5E4E2' : '',
                }}
              >
                <div style={{ display: address.isAddressSelected ? 'block' : 'none' }}>
                  <input type="radio" name="" id="" checked='true' />
                </div>
                <p className='mb-1'>Name : {address.name}</p>
                <p className='mb-1'>Mobile : {address.mobile}</p>
                <p className='mb-1'>Pin Code : {address.pinCode}</p>
                <p className='mb-1'>City : {address.city}</p>
                <p className='mb-1'>Address : {address.address}</p>
                <div className="updated-address mt-2 flex">
                  <button
                    className='edit-address bg-blue-500 text-white py-1 px-2 rounded mr-2'
                    onClick={() => { router.push('/address') }}
                  >
                    Edit
                  </button>
                  <button
                    className='delete-address bg-red-500 text-white py-1 px-2 rounded'
                    onClick={() => deleteAddress(index)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
    
          {/* Checkout Section */}
          <div className="check-out w-full md:w-1/2 lg:w-2/3 xl:w-3/4 md:ml-4">
            <h3 className="text-xl font-bold mb-4">Cart Price Detail</h3>
            <hr className="mb-4" />
            {cartItems.map((item, index) => (
              <p key={index} className="mb-2">
                {item.title.slice(0, 20)} ({item.qty})
              </p>
            ))}
            <hr className="my-4" />
            <h3 className="text-xl font-bold">Total Price: {totalPrice}</h3>
            
              <button
                className="checkout-btn bg-green-500 text-white py-2 px-4 rounded mt-4"
                onClick={makePayment}
              >
                <h4>Proceed to Payment</h4>
              </button>
          
          </div>
        </div>
      );
    };
    
   


export default Page
