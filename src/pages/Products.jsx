import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaStar } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useProductContext } from '../../context/productContext';
import { useCartContext } from '../../context/cartContext';
import { useUserContext } from '../../context/userContext';
import { useWishlistContext } from '../../context/wishlistContext';
import heart from '../assets/favourite.png';
import filledHeart from '../assets/hearth.png';

function Products() {
  const { product, setProduct } = useProductContext();
  const [active, setActive] = useState(0);
  const [category, setCategory] = useState('all');
  const { cartItems, addToCart } = useCartContext();
  const { user } = useUserContext();
  const { wishlist, handleAddToWishlist, handleRemoveFromWishlist } = useWishlistContext();

  const categories = [
    { id: 0, name: 'All', value: 'all' },
    { id: 1, name: 'Dress', value: 'Dress' },
    { id: 2, name: 'Shoes', value: 'Shoes' },
    { id: 3, name: 'Facewash', value: 'Facewash' },
    { id: 4, name: 'Watch', value: 'Watch' },
    { id: 5, name: 'Glass', value: 'Glass' },
  ];

  const handleBtn = (btn) => {
    setActive(btn.id);
    setCategory(btn.value);
  };

  const getProductsByCategory = async () => {
    try {
      let res;
      if (category === 'all') {
        res = await axios.get(`http://localhost:8000/api/v1/product/getAllProduct`);
        setProduct(res.data.data.product);
      } else {
        res = await axios.get(`http://localhost:8000/api/v1/product/category/${category}`);
        setProduct(res.data.data.products);
      }
    } catch (error) {
      console.error("Error fetching products by category:", error);
    }
  };

  useEffect(() => {
    getProductsByCategory();
  }, [category]);

  const handleAddToCart = (productToAdd) => {
    const productInCart = cartItems.find(item => item.product._id === productToAdd._id);
    if (productInCart) {
      
      addToCart({ ...productToAdd, qty: productInCart.quantity + 1 });
    } else {
     
      addToCart({ ...productToAdd, qty: 1 });
    }
  };

  const handleToggleWishlist = (productId) => {
    const inWishlist = wishlist.some(item => item.product._id === productId);
    if (inWishlist) {
      handleRemoveFromWishlist(productId);
    } else {
      handleAddToWishlist(productId);
    }
  };

  // Filter out disabled products
  const filteredProducts = product?.filter(curElem => !curElem.disabled);

  return (
    <div className='pt-[16vh]'>
      <div className='container mx-auto py-8'>
        <div className='p-5 mb-14'>
          <div className='flex flex-wrap justify-center mb-8 gap-5'>
            {categories.map((btn) => (
              <button
                className={
                  active === btn.id
                    ? 'text-xl px-4 py-3 text-center text-white bg-red-500 border-red-500 border-2 rounded-sm justify-center font-medium'
                    : 'text-xl px-4 py-3 text-red-500 border-red-500 border-2 font-medium'
                }
                onClick={() => {
                  handleBtn(btn);
                }}
                key={btn.id}
              >
                {btn.name}
              </button>
            ))}
          </div>
          <div className="grid py-6 gap-8 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1">
            {filteredProducts?.map((curElem) => {
              const inWishlist = wishlist.some(item => item.product._id === curElem._id);
              const productImage = curElem?.productImages && curElem.productImages.length > 0 ? curElem.productImages[0] : ''; 
              const isOwner = user && curElem.userId === user._id;
              const stock = curElem.stock || 0; 

              return (
                <div className="food-card bg-red-500/10 rounded-xl flex flex-col cursor-pointer items-center p-5" key={curElem._id}>
                  <div className="relative mb-3">
                    <Link to={`/products/${curElem?._id}`}>
                      <img src={productImage} alt={curElem.name || 'Product Image'} className="w-full object-cover rounded-md hover:scale-105 transition-transform duration-300" />
                    </Link>
                    <div className='absolute top-2 left-2'>
                      {isOwner ? (
                        <button
                          className='shadow-sm p-5 rounded-full relative bg-gray-300 cursor-not-allowed'
                          disabled
                        >
                          <img
                            src={heart}
                            alt='Cannot add to wishlist'
                            className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'
                          />
                        </button>
                      ) : (
                        <button
                          className={`shadow-sm hover:bg-red-700 p-5 rounded-full relative`}
                          onClick={() => handleToggleWishlist(curElem._id)}
                        >
                          <img
                            src={inWishlist ? filledHeart : heart}
                            alt={inWishlist ? 'Remove from Wishlist' : 'Add to Wishlist'}
                            className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'
                          />
                        </button>
                      )}
                    </div>
                    <div className='absolute bottom-2 right-2'>
                      <button className='shadow-sm bottom-4 border-white text-white bg-[#fdc55e] cursor-pointer p-3 h-14 w-14 text-xl font-bold rounded-full relative'>
                        <div className='absolute text-xl top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>${curElem?.price}</div>
                      </button>
                    </div>
                  </div>
                  <div className='flex flex-col items-center mb-4'>
                    <p className='text-xl text-center font-bold text-[#f54748]'>{curElem?.name}</p>
                    <div className='flex items-center text-sm space-x-2 cursor-pointer'>
                      <span className='font-formal text-[#fdc55e]'>4.5</span>
                      <FaStar size={16} className='text-[#fdc55e]' />
                      <span className='font-medium'>({curElem?.reviews?.length})</span>
                    </div>
                  </div>
                  {stock <= 0 ? (
                    <button className='bg-gray-300 rounded-full px-8 py-2 text-xl font-medium text-white mt-auto' disabled>
                      Out of Stock
                    </button>
                  ) : isOwner ? (
                    <button className='bg-gray-300 cursor-not-allowed rounded-full px-8 py-2 text-xl font-medium text-white mt-auto' disabled>
                      Cannot buy your own product
                    </button>
                  ) : cartItems.some(item => item.product._id === curElem._id) ? (
                    <button className='bg-gray-300 cursor-not-allowed rounded-full px-8 py-2 text-xl font-medium text-white mt-auto'>
                      Already in cart
                    </button>
                  ) : (
                    <button className='bg-[#f54748] active:scale-90 transition duration-150 transform hover:shadow-xl shadow-md rounded-full px-8 py-2 text-xl font-medium text-white mt-auto' onClick={() => handleAddToCart(curElem)}>
                      Add to Cart
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Products;
