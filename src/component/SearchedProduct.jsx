import React from 'react';
import Product from './Product'; 

const SearchedProduct = ({ searchResults }) => {
  return (
    <div className="mt-8">
      <h3 className="text-xl font-semibold text-gray-800 mb-4">Search Results : </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {searchResults.map(product => (
          <Product key={product._id} curElem={product} />
        ))}
      </div>
    </div>
  );
};

export default SearchedProduct;
