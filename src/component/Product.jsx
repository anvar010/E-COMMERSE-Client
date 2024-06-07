import React from 'react';
import { FaStar } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useWishlistContext } from '../../context/wishlistContext'; 
import { useUserContext } from '../../context/userContext'; 
import heart from '../assets/favourite.png'; 
import filledHeart from '../assets/hearth.png'; 

function Product({ curElem }) {
  const { wishlist, handleAddToWishlist, handleRemoveFromWishlist } = useWishlistContext();
  const { user } = useUserContext();

  const inWishlist = wishlist.some(item => item.product._id === curElem._id);

  const isOwner = user && curElem.userId === user._id;

  const handleToggleWishlist = () => {
    if (inWishlist) {
      handleRemoveFromWishlist(curElem._id);
    } else {
      handleAddToWishlist(curElem._id);
    }
  };

  return (
    <div className="food-card bg-red-500/10 rounded-xl flex flex-col items-center p-5 cursor-pointer">
      <div className="relative mb-3 w-full">
        <Link to={`/products/${curElem?._id}`}>
          <img 
            src={curElem?.productImages[0]} 
            alt={curElem.name || 'Product Image'} 
            className="w-full object-cover rounded-md hover:scale-105 transition-transform duration-300" 
          />
        </Link>
        <div className='absolute top-2 left-2'>
          <button 
            className={`shadow-sm hover:bg-red-700 p-5 rounded-full relative ${isOwner && 'cursor-not-allowed pointer-events-none'}`} 
            onClick={!isOwner ? handleToggleWishlist : undefined}
            disabled={isOwner}
          >
            <img
              src={inWishlist ? filledHeart : heart}
              alt={inWishlist ? 'Remove from Wishlist' : 'Add to Wishlist'}
              className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'
            />
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
      <Link 
        to={`/buynow/${curElem?._id}`} 
        className={`bg-[#f54748] active:scale-90 transition duration-150 transform hover:shadow-xl shadow-md rounded-full px-8 py-2 text-xl font-medium text-white mt-auto ${isOwner && 'cursor-not-allowed pointer-events-none'}`}
        disabled={isOwner}
      >
        {isOwner ? "Owned" : "Buy now"}
      </Link>
    </div>
  );
}

export default Product;
