import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function ShowProductPage() {
  const params = useParams();
  const [productDetails, setProductDetails] = useState({});
  const [mainImage, setMainImage] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [disableReason, setDisableReason] = useState('');
  const [isProductDisabled, setIsProductDisabled] = useState(false); // Track product disable state
  const [disableSuccess, setDisableSuccess] = useState(false); // Track disable success state
  const [enableSuccess, setEnableSuccess] = useState(false); // Track enable success state

  useEffect(() => {
    const getProductDetails = async () => {
      try {
        const res = await axios.get(`http://localhost:8000/api/v1/product/getProduct/${params.id}`);
        if (res.data.success) {
          const product = res.data.data.product;
          setProductDetails(product);
          setMainImage(product.productImages[0]);
          setIsProductDisabled(product.disabled); // Assuming product.disabled is boolean
        }
      } catch (error) {
        console.log(error);
      }
    };

    getProductDetails();
  }, [params.id]);

  const handleDisable = () => {
    setIsModalOpen(true);
  };

  const handleSendToEmail = async () => {
    try {
      const res = await axios.post(`http://localhost:8000/api/v1/admin/disable/${params.id}`, { disableReason });
      if (res.data.success) {
        console.log('Product disabled successfully');
        setIsModalOpen(false);
        setIsProductDisabled(true);
        setDisableSuccess(true); // Set disable success state to true
        // Optionally, you can handle any UI updates or notifications here
      } else {
        console.log('Failed to disable product:', res.data.message);
      }
    } catch (error) {
      console.error('Error disabling product:', error);
    }
  };

  const handleEnable = async () => {
    try {
      const res = await axios.post(`http://localhost:8000/api/v1/admin/enable/${params.id}`);
      if (res.data.success) {
        console.log('Product enabled successfully');
        setIsProductDisabled(false);
        setEnableSuccess(true); // Set enable success state to true
        // Optionally, you can handle any UI updates or notifications here
      } else {
        console.log('Failed to enable product:', res.data.message);
      }
    } catch (error) {
      console.error('Error enabling product:', error);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setDisableReason('');
  };

  // Reset success messages after displaying them
  useEffect(() => {
    if (disableSuccess || enableSuccess) {
      const timer = setTimeout(() => {
        setDisableSuccess(false);
        setEnableSuccess(false);
      }, 3000); // Reset after 3 seconds
      return () => clearTimeout(timer);
    }
  }, [disableSuccess, enableSuccess]);

  return (
    <div className='pt-[16vh]'>
      <div className='py-3 px-4 md:px-6 lg:px-8'>
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* Image Gallery */}
            <div className='flex'>
              <div className='flex flex-col items-start '>
                {productDetails?.productImages?.map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt={`Thumbnail ${index}`}
                    className='w-24 h-20 cursor-pointer mb-2 rounded-md shadow-md object-contain'
                    onClick={() => setMainImage(image)}
                  />
                ))}
              </div>
              <div className='bg-white-900/[.3] border rounded-md mb-5 p-4 ml-4 overflow-hidden'>
                <img src={mainImage} alt="" className='w-full h-[25rem] object-contain' />
              </div>
            </div>

            {/* Product Details */}
            <div className='bg-white-900/[.3] border rounded mb-5 p-8 text-black'>
              <div className='text-2xl mb-4 font-bold text-[#f54748]'>
                {productDetails?.name}
              </div>
              <div className='text-2xl mb-4 font-bold text-yellow-500'>
                Price: ${productDetails?.price}
              </div>
              <div className="text-lg text-justify text-black mb-6">
                {productDetails?.description}
              </div>
            </div>
          </div>

          {/* Disable/Enable Button */}
          <div className='text-center mt-4'>
            {isProductDisabled ? (
              <button
                className="inline-flex cursor-pointer items-center gap-1 rounded border border-slate-300 bg-gradient-to-b from-slate-50 to-slate-200 px-4 py-2 font-semibold hover:opacity-90 focus:outline-none focus:ring-1 focus:ring-slate-300 focus:ring-offset-2 active:opacity-100"
                onClick={handleEnable}
              >
                ENABLE
              </button>
            ) : (
              <button
                className="inline-flex cursor-pointer items-center gap-1 rounded border border-slate-300 bg-gradient-to-b from-slate-50 to-slate-200 px-4 py-2 font-semibold hover:opacity-90 focus:outline-none focus:ring-1 focus:ring-slate-300 focus:ring-offset-2 active:opacity-100"
                onClick={handleDisable}
              >
                {isModalOpen ? 'DISABLING...' : 'DISABLE'}
              </button>
            )}
          </div>

          {/* Modal */}
          {isModalOpen && (
            <div className="fixed inset-0 z-50 overflow-auto bg-gray-800 bg-opacity-50 flex justify-center items-center">
              <div className="bg-white p-6 rounded-lg max-w-md w-full">
                <h2 className="text-xl font-semibold mb-4">Disable Product</h2>
                <textarea
                  className="w-full px-3 py-2 border border-gray-300 rounded-md mb-4"
                  placeholder="Enter reason for disabling..."
                  value={disableReason}
                  onChange={(e) => setDisableReason(e.target.value)}
                ></textarea>
                <div className="flex justify-end">
                  <button
                    className="bg-blue-500 text-white px-4 py-2 rounded-md mr-2"
                    onClick={handleSendToEmail}
                  >
                    Send to Email
                  </button>
                  <button
                    className="bg-gray-300 text-gray-800 px-4 py-2 rounded-md"
                    onClick={closeModal}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Success Messages */}
          {disableSuccess && (
            <div className="fixed inset-0 z-50 flex items-center justify-center">
              <div className="bg-green-500 text-white py-2 px-4 rounded-md">
                Product disabled successfully
              </div>
            </div>
          )}

          {enableSuccess && (
            <div className="fixed inset-0 z-50 flex items-center justify-center">
              <div className="bg-green-500 text-white py-2 px-4 rounded-md">
                Product enabled successfully
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ShowProductPage;
