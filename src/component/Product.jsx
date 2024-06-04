import React from 'react';
import { FaHeart, FaStar } from 'react-icons/fa';
import { Link } from 'react-router-dom';

function Product({ curElem }) {
  return (
    <div className="food-card bg-red-500/10 rounded-xl flex flex-col items-center p-5 cursor-pointer">
      <div className="relative mb-3 w-full">
        <Link to={`/products/${curElem?._id}`}>
          <img 
            src={curElem?.productImage} 
            alt="" 
            className="w-full object-cover rounded-md hover:scale-105 transition-transform duration-300" 
          />
        </Link>
        <div className='absolute top-2 left-2'>
          <button className='shadow-sm text-white bg-red-500 hover:bg-red-700 cursor-pointer p-5 rounded-full relative'>
            <FaHeart className='absolute text-xl top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2' />
          </button>
        </div>
        <div className='absolute bottom-2 right-2'>
          <button className='shadow-sm border-white text-white bg-[#fdc55e] cursor-pointer p-3 h-14 w-14 text-xl font-bold rounded-full relative'>
            <div className='absolute text-xl top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>${curElem?.price}</div>
          </button>
        </div>
      </div>
      <div className='flex flex-col items-center mb-4'>
        <p className='text-xl text-center font-bold text-[#f54748]'>
          {curElem?.name}
        </p>
        <div className='flex items-center text-sm space-x-2 cursor-pointer'>
          <span className='font-formal text-[#fdc55e]'>4.3</span>
          <FaStar size={16} className='text-[#fdc55e]' />
          <span className='font-medium'>({curElem?.reviews?.length})</span>
        </div>
      </div>
      <Link to={`/buynow/${curElem?._id}`} className='bg-[#f54748] active:scale-90 transition duration-150 transform hover:shadow-xl shadow-md rounded-full px-8 py-2 text-xl font-medium text-white mt-auto'>
        Buy now
      </Link>
    </div>
  );
}

export default Product;
