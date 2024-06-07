import React, { useEffect, useState } from 'react';
import { useProductContext } from '../../context/productContext';
import axios from 'axios';
import { FaHeart, FaStar } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useCartContext } from '../../context/cartContext';
import { useUserContext } from '../../context/userContext';

function ProductListByUser() {
  const { product, setProduct } = useProductContext();
  const [active, setActive] = useState(0);
  const [value, setValue] = useState('all');
  const { addToCart } = useCartContext();
  const { user } = useUserContext();

  const categories = [
    { id: 0, name: 'All', value: 'all' },
    { id: 1, name: 'Dress', value: 'Dress' },
    { id: 2, name: 'Shoes', value: 'Shoes' },
    { id: 3, name: 'Facewash', value: 'Facewash' },
    { id: 4, name: 'Watch', value: 'Watch' },
    { id: 5, name: 'Glass', value: 'Glass' },
  ];

  const handleBtn = (btn) => {
    setActive(btn.id);
    setValue(btn.value);
    getProductsByCategory(btn.value); // Fetch products by category when a category button is clicked
  };

  const getProductsByCategory = async (categoryValue) => {
    try {
      const res = await axios.get(`http://localhost:8000/api/v1/product/getAllProduct?category=${categoryValue}`);
      if (res.data.success) {
        setProduct(res.data.data.product);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getProducts = async () => {
    const token = localStorage.getItem('token');
    try {
      const res = await axios.get(`http://localhost:8000/api/v1/product/userProducts/${user._id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.data.success) {
        const fetchedProducts = res.data.data.product;
        setProduct(res.data.data.products);
        console.log("Fetched products: ", res.data.data.products);
      }
    } catch (error) {
      console.log(error);
    }
  };
  

  useEffect(() => {
    if (user) {
      getProducts();
    }
  }, [user]);

  return (
    <div className='pt-[16vh]'>
      <div className='container mx-auto py-8'>
        <div className='p-5 mb-14'>
          <div className='flex flex-wrap justify-center mb-8 gap-5'>
            {categories.map((btn) => (
              <button
                className={
                  active === btn.id
                    ? 'text-xl px-4 py-3 text-center text-white bg-red-500 border-red-500 border-2 rounded-sm justify-center font-medium'
                    : 'text-xl px-4 py-3 text-red-500 border-red-500 border-2 font-medium'
                }
                onClick={() => {
                  handleBtn(btn);
                }}
                key={btn.id}
              >
                {btn.name}
              </button>
            ))}
          </div>
          <div className="grid py-6 gap-8 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1">
          {product?.map((curElem) => (
              <div className="food-card bg-red-500/10 rounded-xl flex flex-col cursor-pointer items-center p-5" key={curElem._id}>
                <div className="relative mb-3">
                  <Link to={`/products/${curElem._id}`}>
                    <img src={curElem.productImages[0]} alt={curElem.name} className="w-full object-cover rounded-md hover:scale-105 transition-transform duration-300"/>
                  </Link>
                  <div className='absolute top-2 left-2'>
                  
                  </div>
                  <div className='absolute bottom-2 right-2'>
                    <button className='shadow-sm border-white text-white bg-[#fdc55e] cursor-pointer p-3 h-14 w-14 text-xl font-bold rounded-full'>
                      ${curElem.price}
                    </button>
                  </div>
                </div>
                <div className='flex flex-col items-center mb-4'>
                  <p className='text-xl text-center font-bold text-[#f54748]'>{curElem.name}</p>
                  <div className='flex items-center text-sm space-x-2'>
                    <span className='font-formal text-[#fdc55e]'>4.3</span>
                    <FaStar size={16} className='text-[#fdc55e]' />
                    <span className='font-medium'>({curElem.reviews.length})</span>
                  </div>
                </div>
                <Link to={`/editproduct/${curElem._id}`} className='bg-[#f54748] active:scale-90 transition duration-150 transform hover:shadow-xl shadow-md rounded-full px-8 py-2 text-xl font-medium text-white mt-auto md:text-sm lg:text-lg'>
  <button>Edit the Product</button>
</Link>

              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductListByUser;
