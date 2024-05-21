import React, { useEffect } from 'react';
import { useCartContext } from '../../context/cartContext';
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import axios from 'axios';

function ViewCart() {
    const { cartItems, clearCart, removeItem} = useCartContext();
    const shippingPrice = 40; 

    
   

    const getTotalPrice = () => {
      
        const totalPrice = cartItems.reduce((total, item) => total + (item.product.price * item.quantity), 0);
        return totalPrice + shippingPrice; 
    };

    return (
        <div className='pt-14'>
            <div className={cartItems?.length === 0 ? "bg-gray-100 h-96" : "bg-gray-100"}>
                <div className="container mx-auto py-6">
                    <div className="w-full bg-white px-10 py-5 text-black rounded-md">
                        <div className="flex justify-between border-b pb-8">
                            <h1 className="font-semibold text-2xl">My Cart</h1>
                            <h1 className="font-semibold text-2xl">{cartItems?.length || 0}</h1>
                        </div>
                        <div className="mt-10 flex mb-5">
                            <h3 className="font-semibold text-gray-900 text-xs uppercase w-2/5">Product details</h3>
                            <h3 className="font-semibold text-gray-900 text-xs uppercase w-1/5">Category</h3>
                            <h3 className="font-semibold text-gray-900 text-xs uppercase w-1/5">Price</h3>
                            <h3 className="font-semibold text-gray-900 text-xs uppercase w-1/5">Total Price</h3>
                        </div>
                        {cartItems?.map((product) => (
                            <div key={product._id} className='flex items-center hover:bg-gray-100 -mx-8 px-6 py-5'>
                                <div className="flex">
                                    <div className="w-20">
                                        <img src={product.product.productImage} alt="" className="h-20" /> 
                                    </div>
                                    <div className="flex flex-col justify-between ml-4 flex-grow">
                                        <span className='font-bold text-sm'>{product.product.name}</span> 
                                        <span className='flex items-center space-x-4'>
                                            <div className='shadow-sm text-white bg-red-500 hover:bg-red-700 cursor-pointer p-4 rounded-full relative' onClick={() => removeItem(product)}>
                                                <AiOutlineMinus size={20} className='absolute font-bold top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2' />
                                            </div>
                                            <span className="text-red-500 px-3 py-2 bg-slate-100 text-lg font-medium">{product.quantity}</span>
                                            <div className='shadow-sm text-white bg-red-500 hover:bg-red-700 cursor-pointer p-4 rounded-full relative' onClick={() => addToCart(product)}>
                                                <AiOutlinePlus size={20} className='absolute font-bold top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2' />
                                            </div>
                                        </span>
                                    </div>
                                </div>
                                <div className="flex justify-center w-1/5 cursor-pointer">
                                    <span className='font-bold text-sm'>{product.product.category}</span> {/* Update category access */}
                                </div>
                                <span className='font-bold text-center w-1/5 text-sm'>${product.product.price} x {product.quantity}</span>
                                <span className="font-bold text-center w-1/5 text-sm">${(product.quantity * product.product.price).toFixed(2)}</span>
                            </div>
                        ))}
                        <div className={cartItems.length === 0 ? "mx-auto hidden items-end justify-center px-6 flex-col" : "mx-auto justify-center items-end px-6 flex-col"}>
                            <div className='text-right mb-2 font-semibold text-red-900'>
                                Shipping: ${shippingPrice.toFixed(2)}
                            </div>
                            <div className='text-right mb-2 font-semibold text-red-900'>
                                Total Price: ${getTotalPrice().toFixed(2)} 
                            </div>
                            <div className='flex space-x-4'>
                                <div className='btn text-right justify-end ml-auto text-white hover:bg-red-600 hover:border-red-600 btn-sm bg-red-500'>
                                    <Link to="/success">Check out</Link>
                                </div>
                                <button className='btn text-white hover:bg-gray-600 hover:border-gray-600 btn-sm bg-gray-500' onClick={clearCart}>
                                    Clear Cart
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ViewCart;
