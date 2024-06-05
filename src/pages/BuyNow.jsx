import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai';
import { useCartContext } from '../../context/cartContext';

function BuyNow() {
  const { cartItems,increaseItemQuantity, removeItem } = useCartContext();
  const [shippingCost, setShippingCost] = useState(20); 

  // useEffect(() => {
   
  // }, []);

  
  const getTotalPrice = () => {
    let totalPrice = 0;
    cartItems.forEach(item => {
      totalPrice += item.product.price * item.quantity;
    });
    totalPrice += shippingCost;
    return totalPrice.toFixed(2);
  };

  return (
    <div className='pt-[16vh]'>
      <div className='py-3 px-10 sm:px-4 md:px-6 lg:px-6'>
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 pb-14 gap-8">
            <div className="flex flex-col lg:flex-row bg-gray-100 rounded-b-md p-6">
             
              <div className="flex-1">
                {cartItems.map((product, index) => (
                  <div key={index} className="mb-4 flex items-center">
                    <img src={product.product.productImage} alt={product.product.name} className="w-20 h-20 mr-4" />
                    <div>
                      <h3 className="font-semibold text-lg">{product.product.name}</h3>
                      <p>Price: ${product.product.price}</p>
                      <div className="flex items-center">
                        <button onClick={() => removeItem(product)} className="text-red-500 hover:text-red-700">
                          <AiOutlineMinus />
                        </button>
                        <span className="mx-2">{product.quantity}</span>
                        <button onClick={() => increaseItemQuantity(product)} className="text-green-500 hover:text-green-700">
                          <AiOutlinePlus />
                        </button>
                      </div>
                      
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex flex-col lg:flex-row bg-gray-100 rounded-b-md p-6">
              <div className="flex-1">
                <form></form>
                <div className="flex-1 lg:ml-6 mt-6 lg:mt-0 p-6 border border-red-300">
                  <table className="w-full border-collapse border border-red-300">
                    <thead>
                      <tr>
                        <th colSpan="2" className="py-2 border-b border-red-300 text-left bg-gradient-to-br from-[#5195A8] to-[#70EAFF] text-white rounded-t-md">Your order</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="py-2 border-b border-gray-300">Shipping</td>
                        <td className="py-2 border-b border-gray-300 text-right text-[#52ad9c]">${shippingCost}</td>
                      </tr>
                      <tr>
                        <td className="py-2">Total</td>
                        <td className="py-2 text-right text-[#52ad9c]">${getTotalPrice()}</td>
                      </tr>
                    </tbody>
                  </table>
                  <Link to={'/success'}>
                    <button type="button" className="w-full shadow-sm text-white bg-red-500 py-2 rounded-full mt-4 hover:bg-red-700 focus:outline-none focus:ring focus:ring-opacity-50 focus:ring-[#52ad9c]">Place Order</button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BuyNow;
