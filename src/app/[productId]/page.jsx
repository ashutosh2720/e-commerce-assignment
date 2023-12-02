'use client'
import { UseGlobaleCart } from '@/contexts/cartContext'
import Image from 'next/image'
import React from 'react'

const page = ({params:{productId}}) => {
    const {productData} = UseGlobaleCart() 
    const singleProduct = productData.find((product)=>product._id===productId)
  return (
    <div>
     <img  />
     <Image src={singleProduct.thumbnail} alt="" width={1000} height={1000}/>
    </div>
  )
}

export default page
