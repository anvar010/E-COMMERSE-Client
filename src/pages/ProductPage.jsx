import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import PageNavigation from '../component/PageNavigation';
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai';
import { useCartContext } from '../../context/cartContext';
import { toast } from 'react-toastify';

function ProductPage() {
  const params = useParams();
  const [value, setValue] = useState('all');
  const [productDetails, setProductDetails] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const { cart, addToCart, removeItem, cartItems } = useCartContext();
 

  const getProductDetails = async () => {
    try {
      const res = await axios.get(`http://localhost:8000/api/v1/product/getProduct/${params.id}`);
      if (res.data.success) {
        setProductDetails(res.data.data.product);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const getProducts = async () => {
    try {
      const res = await axios.get(`http://localhost:8000/api/v1/product/getAllProduct?category=${value}`);
      if (res.data.success) {
        setProduct(res.data.data.product);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleAddToCart = () => {
    const productInCart = cartItems.find(item => item.product._id === productDetails._id);
    if (productInCart) {
      toast.error("Product already in cart");
      console.log("Product already in cart");
    } else {
      addToCart({ ...productDetails, qty: quantity });
      toast.success("Product added to cart");
    }
  };
  

  useEffect(() => {
    getProductDetails();
    getProducts();
  }, []);

  // const handleAddToCart = () => {
  //   addToCart({ ...productDetails, qty: quantity });
  // };

  const handleRemoveItem = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
      removeItem(productDetails);
    }
  };

  return (
    <div className='pt-[16vh]'>
      <div className='py-3 px-10 sm:px-4 md:px-6 lg:px-6'>
        <div className="container mx-auto">
          <PageNavigation title={productDetails?.name} />

          <div className="grid grid-cols-1 md:grid-cols-2 pb-14 gap-8">
            <div className='bg-red-200/[.3] border rounded-md mb-5 p-4'>
              <img src={productDetails?.productImage} alt="" className='w-full h-[25rem] cursor-pointer' />
            </div>

            <div className='bg-red-200/[.3] border rounded mb-5 p-8 text-black' >
              <div className='text-2xl mb-2 font-bold text-[#f54748]'>
                {productDetails?.name}
              </div>
              <div className='text-2xl mb-2 font-bold text-yellow-500'>
                Price: {productDetails?.price}
              </div>
              <div className="text-xl text-justify text-black mb-6">
                {productDetails?.description}
              </div>
              <div className="flex items-center justify-between mb-6">
                <div className='text-2xl font-bold text-[#f54748]'>
                  Quantity
                </div>
                <span className='flex items-center space-x-4'>
                  <div
                    className='shadow-sm text-white bg-red-500 hover:bg-red-700 cursor-pointer p-4
                    rounded-full relative'
                    onClick={handleRemoveItem}
                  >
                    <AiOutlineMinus className='font-bold absolute top-1/2 left-1/2
                    -translate-x-1/2 -translate-y-1/2 size={20}' />

                  </div>
                  <span className='text-red-500 px-3 py-2 bg-slate-100 text-lg font-medium'>
                    {quantity}
                  </span>
                  <div
                    className='shadow-sm text-white bg-red-500 hover:bg-red-700 cursor-pointer p-4
                    rounded-full relative'
                    onClick={() => setQuantity(quantity + 1)}
                  >
                    <AiOutlinePlus className='font-bold absolute top-1/2 left-1/2
                    -translate-x-1/2 -translate-y-1/2 size={20}' />

                  </div>

                </span>

              </div>
              <div className="flex flex-col sm:flex-row items-center space-y-6 sm:space-y-0 sm:gap-5 sm:mx-auto sm:justify-center">
                <button className='bg-white active:scale-90 transition duration-500 transform
                        hover:shadow-xl shadow-md rounded-full px-8 py-2 text-xl font-medium text-[#f54748] '>
                  Favourite
                </button>
                <button className='bg-[#f54748] active:scale-90 transition duration-500 transform
  hover:shadow-xl shadow-md rounded-full px-8 py-2 text-xl font-medium text-white'
  onClick={handleAddToCart}
>
  Add to Cart
</button>


              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}

export default ProductPage;
