'use client'
import { UseGlobaleCart } from '@/contexts/cartContext'
import { useRouter } from 'next/router'
import React from 'react'


const Page = () => {
    const { addresses, editAddress, deleteAddress, formData, saveAddress, handleInputChange, editIndex, addAddress } = UseGlobaleCart()

    function formHandler(){
      e.preventDefault()
      editIndex === -1 ? addAddress : saveAddress

    }
  return (
    <div className='address-container'>
    <div className="form-data">
      <form onSubmit={formHandler} className="flex flex-col space-y-4">
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          placeholder="Name"
          required
          className="border p-2 rounded"
        />
        <input
          type="text"
          name="mobile"
          value={formData.mobile}
          onChange={handleInputChange}
          placeholder="Mobile Number"
          required
          className="border p-2 rounded"
        />
        <input
          type="text"
          name="pinCode"
          value={formData.pinCode}
          onChange={handleInputChange}
          placeholder="Pin Code"
          required
          className="border p-2 rounded"
        />
        <input
          type="text"
          name="city"
          value={formData.city}
          onChange={handleInputChange}
          placeholder="City"
          required
          className="border p-2 rounded"
        />
        <input
          type="text"
          name="address"
          value={formData.address}
          onChange={handleInputChange}
          placeholder="Address"
          required
          className="border p-2 rounded"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded"
        >
          {editIndex === -1 ? 'Add Address' : 'Save Address'}
        </button>
      </form>
    </div>
  
    {addresses?.map((address, index) => (
      <div key={index} className='addresses border p-4 rounded mt-4'>
        <p className="mb-1">Name: {address.name}</p>
        <p className="mb-1">Mobile: {address.mobile}</p>
        <p className="mb-1">Pin Code: {address.pinCode}</p>
        <p className="mb-1">City: {address.city}</p>
        <p className="mb-1">Address: {address.address}</p>
        <button
          className='edit bg-blue-500 text-white py-1 px-2 rounded mr-2'
          onClick={() => editAddress(index)}
        >
          Edit
        </button>
        <button
          className='delete bg-red-500 text-white py-1 px-2 rounded'
          onClick={() => deleteAddress(index)}
        >
          Delete
        </button>
      </div>
    ))}
  </div>
  
  )
}

export default Page
