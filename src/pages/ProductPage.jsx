import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCartContext } from '../../context/cartContext';
import { useWishlistContext } from '../../context/wishlistContext';
import { useUserContext } from '../../context/userContext';
import { toast } from 'react-toastify';
import PageNavigation from '../component/PageNavigation';

function ProductPage() {
  const params = useParams();
  const [productDetails, setProductDetails] = useState({});
  const [quantity, setQuantity] = useState(1);
  const [mainImage, setMainImage] = useState('');
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [productRating, setProductRating] = useState(0);
  const [reviews, setReviews] = useState([]);
  const { cartItems, addToCart } = useCartContext();
  const { wishlist, handleAddToWishlist, handleRemoveFromWishlist } = useWishlistContext();
  const { user } = useUserContext();
  const navigate = useNavigate();

  const getProductDetails = async () => {
    try {
      const res = await axios.get(`http://localhost:8000/api/v1/product/getProduct/${params.id}`);
      if (res.data.success) {
        const product = res.data.data.product;
        setProductDetails(product);
        setMainImage(product.productImages[0]);
        setProductRating(product.rating);
        setReviews(product.reviews);
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
    } else {
      handleAddToWishlist(productDetails._id);
    }
  };

  const handleBuyNow = () => {
    if (productDetails.stock <= 0) {
      toast.error("Product is out of stock");
    } else if (user && user._id === productDetails.userId) {
      toast.error("Cannot buy your own product");
    } else {
      navigate(`/buynow/${params.id}`);
    }
  };

  const handleRatingSubmit = async () => {
    try {
      const res = await axios.post(`http://localhost:8000/api/v1/product/${params.id}/reviews`, {
        rating: rating,
        comment: comment,
        userId: user._id, // Assuming your user object has _id property
      });
      if (res.data.success) {
        toast.success("Product rated successfully");
        setRating(0);
        setComment('');
        getProductDetails(); // Fetch updated product details including reviews
      } else {
        toast.error("Failed to rate product");
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to rate product");
    }
  };

  useEffect(() => {
    getProductDetails();
  }, []);

  const isOwner = user && productDetails.userId === user._id;

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
                {isOwner ? (
                  <button
                    className='bg-gray-300 cursor-not-allowed rounded-full px-8 py-3 text-lg font-medium text-white'
                    disabled
                  >
                    Cannot favourite your own product
                  </button>
                ) : (
                  <button className='bg-white active:scale-90 transition duration-500 transform hover:shadow-xl shadow-md rounded-full px-8 py-3 text-lg font-medium text-[#f54748]' onClick={handleToggleWishlist}>
                    {wishlist.some(item => item.product._id === productDetails._id) ? "Favourited" : "Favourite"}
                  </button>
                )}
                {isOwner ? (
                  <button
                    className='bg-gray-300 cursor-not-allowed rounded-full px-8 py-3 text-lg font-medium text-white'
                    disabled
                  >
                    Cannot add to cart your own product
                  </button>
                ) : cartItems.some(item => item.product._id === productDetails._id) ? (
                  <button className='bg-gray-300 cursor-not-allowed rounded-full px-8 py-3 text-lg font-medium text-white'>
                    Already in cart
                  </button>
                ) : (
                  <button className='bg-[#f54748] active:scale-90 transition duration-500 transform hover:shadow-xl shadow-md rounded-full px-8 py-3 text-lg font-medium text-white' onClick={handleAddToCart}>
                    Add to Cart
                  </button>
                )}
                <button className={`bg-[#f54748] active:scale-90 transition duration-500 transform hover:shadow-xl shadow-md rounded-full px-8 py-3 text-lg font-medium text-white ${productDetails.stock <= 0 && 'cursor-not-allowed'}`} onClick={handleBuyNow}>
                  {isOwner ? "Cannot buy your own product" : productDetails.stock <= 0 ? "Out of Stock" : "Buy Now"}
                </button>
              </div>
            </div>
          </div>

          {/* Rating Section */}
          <div className="bg-gray-200 border rounded p-8 mt-8">
            <h2 className="text-2xl mb-4 font-bold">Rate This Product</h2>
            <div className="flex items-center space-x-2 mb-4">
              {[1, 2, 3, 4, 5].map((star) => (
                <span
                  key={star}
                  className={`cursor-pointer text-2xl ${rating >= star ? 'text-yellow-500' : 'text-gray-300'}`}
                  onClick={() => setRating(star)}
                >
                  &#9733;
                </span>
              ))}
            </div>
            <textarea
              className="border rounded w-full h-20 p-2 mb-4"
              placeholder="Write a comment..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
            <button
              className={`bg-[#f54748] active:scale-90 transition duration-500 transform hover:shadow-xl shadow-md rounded-full px-8 py-3 text-lg font-medium text-white ${productDetails.stock <= 0 && 'cursor-not-allowed'}`}
              onClick={handleRatingSubmit}
              disabled={!rating || !comment.trim()} // Disable button if rating or comment is empty
            >
              Submit Rating
            </button>
          </div>

          {/* Display Product Reviews */}
          {reviews.length > 0 && (
            <div className="bg-gray-200 border rounded p-8 mt-8">
              <h2 className="text-2xl mb-4 font-bold">Product Reviews</h2>
              {reviews.map((review, index) => (
                <div key={index} className="mb-4">
                  <div className="flex items-center space-x-2 mb-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <span
                        key={star}
                        className={`text-2xl ${review.rating >= star ? 'text-yellow-500' : 'text-gray-300'}`}
                      >
                        &#9733;
                      </span>
                    ))}
                  </div>
                  <p className="text-lg mb-2">{review.comment}</p>
                  {review.user ? (
                    <div className="flex items-center">
                      <img
                        src={review.user.profileImage}
                        alt={`${review.user.name}'s profile`}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      <span className="ml-2">{review.user.name}</span>
                    </div>
                  ) : (
                    <span className="text-gray-400">Anonymous</span>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProductPage;
