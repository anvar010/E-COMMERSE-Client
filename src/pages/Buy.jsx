import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai';
import { useCartContext } from '../../context/cartContext';
import { Link } from 'react-router-dom';

function Buy() {
  const params = useParams();
  const [productDetails, setProductDetails] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const { addToCart,cartItems } = useCartContext();
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('dbt');
  const userId = params.userId; 
  const shippingCost = 20; 
  const total = (productDetails?.price ?? 0) * quantity + shippingCost;

  useEffect(() => {
    const getProductDetails = async () => {
      try {
        const res = await axios.get(`http://localhost:8000/api/v1/product/getProduct/${params.id}`);
        if (res.data.success) {
          const product = res.data.data.product;
          // Check if product is coming from cart
          const cartProduct = cartItems.find(item => item.product._id === product._id);
          if (cartProduct) {
            
            setQuantity(cartProduct.quantity);
          }
          setProductDetails(product);
        }
      } catch (error) {
        console.log(error);
      }
    };
  
    getProductDetails();
  }, [params.id, cartItems]);
  

  const handleAddToCart = () => {
    if (productDetails) {
      addToCart({ ...productDetails, qty: quantity, userId: userId }); 
    }
  };

  const handleRemoveItem = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleIncreaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  return (
    <div className='pt-[16vh]'>
      <div className='py-3 px-10 sm:px-4 md:px-6 lg:px-6'>
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 pb-14 gap-8">
            <div className="flex flex-col lg:flex-row bg-gray-100 rounded-b-md p-6 relative">
              <img src={productDetails?.productImage} alt="" className='w-full h-[25rem] cursor-pointer' />
              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 flex items-center">
                <button onClick={handleRemoveItem} className="text-red-500 hover:text-red-700 text-2xl">
                  <AiOutlineMinus />
                </button>
                <span className="mx-4 text-2xl">{quantity}</span>
                <button onClick={handleIncreaseQuantity} className="text-green-500 hover:text-green-700 text-2xl">
                  <AiOutlinePlus />
                </button>
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
                        <td className="py-2 border-b border-gray-300">{productDetails?.name}</td>
                        <td className="py-2 border-b border-gray-300 text-right text-[#52ad9c]">{productDetails?.price}</td>
                      </tr>
                      <tr>
                        <td className="py-2 border-b border-gray-300">Shipping</td>
                        <td className="py-2 border-b border-gray-300 text-right text-[#52ad9c]">{shippingCost}</td>
                      </tr>
                      <tr>
                        <td className="py-2">Subtotal</td>
                        <td className="py-2 text-right text-[#52ad9c]">{total}</td>
                      </tr>
                    </tbody>
                  </table>
                  <div className="mt-6">
                    <label className="inline-flex items-center mb-4">
                      <input 
                        type="radio" 
                        name="paymentMethod" 
                        value="dbt" 
                        checked={selectedPaymentMethod === 'dbt'}
                        onChange={(e) => setSelectedPaymentMethod(e.target.value)}
                        className="form-radio text-indigo-600" 
                      />
                      <span className="ml-2">Direct Bank Transfer</span>
                    </label>
                    <p className="mt-1 text-sm text-gray-600">
                      Make your payment directly into our bank account. Please use your Order ID as the payment reference. Your order will not be shipped until the funds have cleared in our account.
                    </p>
                  </div>
                  <div className="mt-4">
                    <label className="inline-flex items-center mb-4">
                      <input 
                        type="radio" 
                        name="paymentMethod" 
                        value="cd" 
                        checked={selectedPaymentMethod === 'cd'}
                        onChange={(e) => setSelectedPaymentMethod(e.target.value)}
                        className="form-radio text-indigo-600" 
                        disabled={total > 20000}
                      />
                      <span className="ml-2">Cash on Delivery</span>
                    </label>
                  </div>
                  <div className="mt-4">
                    <label className="inline-flex items-center mb-4">
                      <input 
                        type="radio" 
                        name="paymentMethod" 
                        value="paypal" 
                        checked={selectedPaymentMethod === 'paypal'}
                        onChange={(e) => setSelectedPaymentMethod(e.target.value)}
                        className="form-radio text-indigo-600" 
                      />
                      <span className="ml-2">Paypal</span>
                      <img src="https://www.logolynx.com/images/logolynx/c3/c36093ca9fb6c250f74d319550acac4d.jpeg" alt="Paypal" className="ml-2 w-15 h-8" />
                    </label>
                  </div>
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

export default Buy;
