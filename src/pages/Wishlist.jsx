import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useWishlistContext } from '../../context/wishlistContext';
import axios from 'axios';

function ViewWishlist() {
  const { wishlist, handleRemoveFromWishlist } = useWishlistContext();

  return (
    <div className='pt-14'>
      <div className="bg-gray-100">
        <div className="container mx-auto py-6">
          <div className="w-full bg-white px-10 py-5 text-black rounded-md">
            <div className="flex justify-between border-b pb-8">
              <h1 className="font-semibold text-2xl">My Wishlist</h1>
            </div>
            <div className="mt-10 mb-5 grid grid-cols-12 gap-4">
              <h3 className="font-semibold text-gray-900 text-xs uppercase col-span-4">Product details</h3>
              <h3 className="font-semibold text-gray-900 text-xs uppercase col-span-2 text-center">Category</h3>
              <h3 className="font-semibold text-gray-900 text-xs uppercase col-span-2 text-center">Price</h3>
              <h3 className="font-semibold text-gray-900 text-xs uppercase col-span-2 text-center">Actions</h3>
            </div>
            {wishlist.map((product) => (
              <div key={product.product._id} className='grid grid-cols-12 gap-4 items-center hover:bg-gray-100 -mx-8 px-6 py-5'>
                <Link to={`/products/${product.product._id}`} className="col-span-1">
                  <img src={product.product.productImage} alt="" className="h-20 w-20" />
                </Link>
                <div className="col-span-3 flex flex-col justify-between ml-4">
                  <span className='font-bold text-sm'>{product.product.name}</span>
                </div>
                <div className="col-span-2 text-center">
                  <span className='font-bold text-sm'>{product.product.category}</span>
                </div>
                <div className="col-span-2 text-center">
                  <span className='font-bold text-sm'>${product.product.price}</span>
                </div>
                <div className="col-span-2 text-center">
                  <button className='text-red-500 hover:text-red-700 cursor-pointer' onClick={() => handleRemoveFromWishlist(product._id)}>Remove</button>
                </div>
              </div>
            ))}
            {wishlist.length === 0 && (
              <div className="text-center text-gray-600 mt-8">Your wishlist is empty.</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ViewWishlist;
