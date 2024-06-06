import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // Import useNavigate
import PageNavigation from '../component/PageNavigation';
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai';
import { useCartContext } from '../../context/cartContext';
import { useWishlistContext } from '../../context/wishlistContext'; // Import the wishlist context
import { toast } from 'react-toastify';

function ProductPage() {
  const params = useParams();
  const [productDetails, setProductDetails] = useState({});
  const [quantity, setQuantity] = useState(1);
  const [mainImage, setMainImage] = useState('');
  const { cartItems, addToCart, removeItem } = useCartContext();
  const { wishlist, handleAddToWishlist: addToWishlist, handleRemoveFromWishlist } = useWishlistContext(); 
  const navigate = useNavigate(); // Initialize useNavigate

  const getProductDetails = async () => {
    try {
      const res = await axios.get(`http://localhost:8000/api/v1/product/getProduct/${params.id}`);
      if (res.data.success) {
        const product = res.data.data.product;
        setProductDetails(product);
        setMainImage(product.productImages[0]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddToCart = () => {
    const productInCart = cartItems.find(item => item.product._id === productDetails._id);
    if (productInCart) {
      toast.error("Product already in cart");
    } else {
      addToCart({ ...productDetails, qty: quantity });
      toast.success("Product added to cart");
    }
  };

  const handleToggleWishlist = () => {
    const productInWishlist = wishlist.find(item => item.product._id === productDetails._id);
    if (productInWishlist) {
      handleRemoveFromWishlist(productDetails._id);
      // toast.success("Product removed from wishlist");
    } else {
      addToWishlist(productDetails._id); 
      // toast.success("Product added to wishlist");
    }
  };

  const handleBuyNow = () => {
    navigate(`/buynow/${params.id}`); // Redirect to /buynow/productId using navigate
  };

  useEffect(() => {
    getProductDetails();
  }, []);

  return (
    <div className='pt-[16vh]'>
      <div className='py-3 px-4 md:px-6 lg:px-8'>
        <div className="container mx-auto">
          <PageNavigation title={productDetails?.name} />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className='flex'>
              <div className='flex flex-col items-start'>
                {productDetails?.productImages?.map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt={`Thumbnail ${index}`}
                    className='w-16 h-16 object-cover cursor-pointer mb-2'
                    onClick={() => setMainImage(image)}
                  />
                ))}
              </div>
              <div className='bg-red-200/[.3] border rounded-md mb-5 p-4 ml-4'>
                <img src={mainImage} alt="" className='w-full h-[25rem] cursor-pointer object-cover' />
              </div>
            </div>

            <div className='bg-red-200/[.3] border rounded mb-5 p-8 text-black'>
              <div className='text-2xl mb-4 font-bold text-[#f54748]'>
                {productDetails?.name}
              </div>
              <div className='text-2xl mb-4 font-bold text-yellow-500'>
                Price: ${productDetails?.price}
              </div>
              <div className="text-lg text-justify text-black mb-6">
                {productDetails?.description}
              </div>
              <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:gap-4 sm:mx-auto">
                <button className='bg-white active:scale-90 transition duration-500 transform hover:shadow-xl shadow-md rounded-full px-8 py-3 text-lg font-medium text-[#f54748]' onClick={handleToggleWishlist}>
                  {wishlist.some(item => item.product._id === productDetails._id) ? "Favourited" : "Favourite"}
                </button>
                {cartItems.some(item => item.product._id === productDetails._id) ? (
                  <button className='bg-gray-300 cursor-not-allowed rounded-full px-8 py-3 text-lg font-medium text-white'>
                    Already in cart
                  </button>
                ) : (
                  <button className='bg-[#f54748] active:scale-90 transition duration-500 transform hover:shadow-xl shadow-md rounded-full px-8 py-3 text-lg font-medium text-white' onClick={handleAddToCart}>
                    Add to Cart
                  </button>
                )}
                <button className='bg-[#f54748] active:scale-90 transition duration-500 transform hover:shadow-xl shadow-md rounded-full px-8 py-3 text-lg font-medium text-white' onClick={handleBuyNow}>
                  Buy Now
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
