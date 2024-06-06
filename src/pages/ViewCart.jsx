import React from 'react';
import { Link, useNavigate } from 'react-router-dom'; 
import { useCartContext } from '../../context/cartContext';
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai';
import { useUserContext } from '../../context/UserContext';

function ViewCart() {
  const { cartItems, clearCart, removeItem, increaseItemQuantity, setQuantityToZero } = useCartContext();
  const shippingPrice = 40;
  const { user } = useUserContext();
  const navigate = useNavigate(); 

  const getTotalPrice = () => {
    const totalPrice = cartItems.reduce((total, item) => total + (item.product.price * item.quantity), 0);
    return totalPrice + shippingPrice;
  };

  const handleRemoveSingleItem = (product) => {
    setQuantityToZero(product);
  };
  
  const handleCheckout = () => {
    if (cartItems.length === 1) {
      const productId = cartItems[0].product._id; 
      navigate(`/buynow/${productId}`); // Redirect to /buynow/productid if only one item in cart
    } else {
      navigate({
        pathname: '/buynow',
        state: { cartItems }
      });
    }
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
            {cartItems?.length === 0 && (
              <div className="text-center text-gray-600 mt-8">Your cart is empty.</div>
            )}
            {cartItems?.length > 0 && (
              <div className="mt-10 mb-5 grid grid-cols-12 gap-4">
                <h3 className="font-semibold text-gray-900 text-xs uppercase col-span-4">Product details</h3>
                <h3 className="font-semibold text-gray-900 text-xs uppercase col-span-2 text-center">Category</h3>
                <h3 className="font-semibold text-gray-900 text-xs uppercase col-span-2 text-center">Price</h3>
                <h3 className="font-semibold text-gray-900 text-xs uppercase col-span-2 text-center">Total Price</h3>
                <h3 className="font-semibold text-gray-900 text-xs uppercase col-span-2 text-center">Actions</h3>
              </div>
            )}
            {cartItems?.length > 0 && cartItems.map((product) => (
              <div key={product._id} className='grid grid-cols-12 gap-4 items-center hover:bg-gray-100 -mx-8 px-6 py-5'>
                <Link to={`/products/${product.product._id}`} className="col-span-1">
                <img src={product.product.productImages[0]} alt="" className="h-20 w-20" /> 
                </Link>
                <div className="col-span-3 flex flex-col justify-between ml-4">
                  <span className='font-bold text-sm'>{product.product.name}</span>
                  <span className='flex items-center space-x-4 mt-2'>
                    <div className='shadow-sm text-white bg-red-500 hover:bg-red-700 cursor-pointer p-2 rounded-full' onClick={() => removeItem(product)}>
                      <AiOutlineMinus size={16} className='font-bold' />
                    </div>
                    <span className="text-red-500 px-3 py-2 bg-slate-100 text-lg font-medium">{product.quantity}</span>
                    <div className='shadow-sm text-white bg-red-500 hover:bg-red-700 cursor-pointer p-2 rounded-full' onClick={() => increaseItemQuantity(product)}>
                      <AiOutlinePlus size={16} className='font-bold' />
                    </div>
                  </span>
                </div>
                <div className="col-span-2 text-center">
                  <span className='font-bold text-sm'>{product.product.category}</span>
                </div>
                <div className="col-span-2 text-center">
                  <span className='font-bold text-sm'>${product.product.price} x {product.quantity}</span>
                </div>
                <div className="col-span-2 text-center">
                  <span className="font-bold text-sm">${(product.quantity * product.product.price).toFixed(2)}</span>
                </div>
                <div className="col-span-2 text-center">
                  <button className='text-red-500 hover:text-red-700 cursor-pointer' onClick={() => handleRemoveSingleItem(product)}>Remove</button>
                </div>
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
                {user && cartItems.length > 0 && (
                  <button className='btn text-right justify-end ml-auto text-white hover:bg-red-600 hover:border-red-600 btn-sm bg-red-500' onClick={handleCheckout}>
                  Check out
                  </button>
                )}
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

