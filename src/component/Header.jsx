import React, { useState } from 'react';
import { FaPlay, FaSearch } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useProductContext } from '../../context/productContext';
import axios from 'axios';
import header from '../assets/banner.jpg';
import SearchedProduct from './SearchedProduct';

function Header() {
  const { setProduct } = useProductContext();
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [error, setError] = useState('');

  const handleSearch = async (searchTerm) => {
    try {
      const response = await axios.get(`http://localhost:8000/api/v1/product/${encodeURIComponent(searchTerm)}`);
      const { data } = response.data;
      setProduct(data.products); // Update products in the context with search results
      setSearchResults(data.products); // Update local state for displaying search results
      setError(''); // Reset any previous error message
    } catch (error) {
      console.error('Error searching products by name:', error);
      setSearchResults([]); // Clear previous search results on error
      setError('Error searching products. Please try again later.'); // Display error message
    }
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value); // Update search term state
    if (value.trim() === '') {
      setSearchResults([]); // Clear search results if input is empty
    } else {
      // Call handleSearch with the updated search term
      handleSearch(value);
    }
  };

  return (
    <div className='py-3 px-10 sm:px-4 md:px-6 lg:px-6'>
      <div className="container mx-auto py-[16vh]">
        <div className="grid grid-cols-1 relative lg:grid-cols-2 gap-8 items-center">
          <div className='lg:w-[32rem] w-full flex flex-col space-y-6'>
            <div className='text-4xl md:text-5xl font-bold text-[#2e2e2e] lg:text-6xl'>
              Elevate <span className='text-[#f54748]'>Your</span> Online{' '}
              <span className='text-[#f54748]'>Shopping</span> Experience{' '}
              <span className='text-[#Fdc55e]'>Here .</span>
            </div>
            <div className="lg:text-xl text-[#191919] md:text-lg text-base">
              Welcome to a world where your desires come to life with just a click. Elevate your
              shopping journey with us – where quality meets convenience, and your satisfaction is our priority.
            </div>
            <div className="flex rounded-full py-2 px-4 justify-between items-center bg-white shadow-md">
              <div className='flex items-center'>
                <FaSearch size={22} className='cursor-pointer'/>
                <input
                  type="text"
                  placeholder='Search products here...'
                  className='text-[#191919] w-full border-none outline-none py-2 px-4'
                  value={searchTerm}
                  onChange={handleInputChange} // Call handleInputChange on input change
                />
              </div>
              <div className='h-10 w-10 relative bg-[#fdc55e] rounded-full'>
                <FaSearch
                  size={15}
                  className='cursor-pointer text-white absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'
                  onClick={() => handleSearch(searchTerm)} // Call handleSearch on search icon click
                />
              </div>
            </div>
            {/* Render search results if there are any */}
           
            {/* Display message when no results are found */}
            {searchTerm.trim() !== '' && searchResults.length === 0 && (
              <div className="mt-4 text-gray-800">No results found for '{searchTerm}'</div>
            )}
            {/* Display error message if there's an error */}
            {error && (
              <div className="mt-4 text-red-600">{error}</div>
            )}
            <div className="flex flex-col sm:flex-row gap-8 items-center mt-4">
              <Link to={'/products'}><button className='bg-[#f54748] active:scale-90 transition duration-500 transform hover:shadow-xl shadow-md rounded-full px-8 py-2 text-xl font-medium text-white'>
                Explore Now
              </button></Link>
              <Link to={'https://www.youtube.com/@SHOPNOW-sd7kk'}>
              <div className="flex gap-4 items-center">
                <div className='h-14 w-14 shadow-md cursor-pointer relative bg-white rounded-full'>
                  <FaPlay size={18} className='cursor-pointer text-[#f54748] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'/>
                </div>

                <div className='lg:text-xl text-[#191919] md:text-lg text-base cursor-pointer'>
                  Watch Now
                </div>
               
              </div> </Link>
            </div>
           
          </div>
          <img src={header} alt="" className='h-[35rem] mx-auto justify-end'/>
        </div>
        {searchResults.length > 0 && (
              <SearchedProduct searchResults={searchResults} />
            )}
      </div>
    </div>
  );
}

export default Header;
