import React, { useEffect, useState } from 'react';
import { useProductContext } from '../../context/productContext';

import axios from 'axios';
import { FaHeart, FaStar } from 'react-icons/fa';
import { Link, useParams } from 'react-router-dom';
import { useCartContext } from '../../context/cartContext';

function Products() {
  const {product,setProduct} = useProductContext()
  const [active, setActive] = useState(0);
  const [value, setValue] = useState('all');
  const category = [
    {
      id: 0,
      name: 'All',
      value: 'all',
    },
    {
      id: 1,
      name: 'Dress',
      value: 'Dress',
    },
    {
      id: 2,
      name: 'Shoes',
      value: 'Shoes',
    },
    {
      id: 3,
      name: 'Facewash',
      value: 'Facewash',
    },
    {
      id: 4,
      name: 'Watch',
      value: 'Watch',
    },
    {
      id: 5,
      name: 'Glass',
      value: 'Glass',
    },
  ];

  const handleBtn = (btn) => {
    setActive(btn.id);
    setValue(btn.value);
  };
  const params = useParams()

  const getProducts = async () =>{
    try{
    const res = await axios.get(`http://localhost:8000/api/v1/product/getAllProduct?category=${value}`)
    if(res.data.success){
     setProduct(res.data.data.product)
  }
}catch(error){
  console.log(error);

  }
  }
  console.log(product);
  useEffect(()=>{
    getProducts()
  },[value])

  const {addToCart} = useCartContext()

  return (
    <div className='pt-[16vh]'>
      <div className='container mx-auto py-8'>
        <div className='p-5 mb-14'>
          <div className='flex flex-wrap justify-center mb-8 gap-5'>
            {category?.map((btn) => (
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
          <div className="grid py-6  gap-8 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1">
            {
              product?.map((curElem)=>(
                <div className="food-card  bg-red-500/10 rounded-xl flex flex-col cursor-pointer items-center p-5">
    <div className="relative mb-3">
      <Link to={`/products/${curElem?._id}`}>
        <img src={curElem?.productImage} alt="" />
        </Link>
        <div className='absolute top-2 left-2'>
            <button className='shadow-sm text-white bg-red-500 hover:bg-red-700
            cursor-pointer p-5 rounded-full relative'>
                <FaHeart className='absolute text-xl top-1/2 left-1/2 -translate-x-1/2
                -translate-y-1/2'/>
            </button>
        </div>
        <div className='absolute bottom-2 right-2'>
            <button className='shadow-sm bottom-4 border-white text-white
            bg-[#fdc55e] cursor-pointer p-3 h-14 w-14 text-xl font-bold rounded-full 
            relative'>
                <div className='absolute text-xl top-1/2 left-1/2 -translate-x-1/2
                -translate-y-1/2'>${curElem?.price}</div>
            </button>
        </div>
    </div>
    <div className='flex gap-4 items-center'>
        <p className='text-xl text-center font-bold text-[#f54748]'>
          {curElem?.name}
        </p>
        <div className='flex text-sm space-x-2 cursor-pointer'>
            <span className='font-formal text-[#fdc55e]'>4.3</span>
            <FaStar size={16} className='text-[#fdc55e]'/>
            <span className='font-medium'>({curElem?.reviews?.length})</span>
        </div>
    </div>
    <button className='bg-[#f54748] active:scale-90 transition duration-150 transform
    hover:shadow-xl shadow-md rounded-full px-8 py-2 text-xl font-medium text-white' onClick={()=>addToCart(curElem)}>
     Add to Cart
    </button>






</div>

              ))
            }
          </div>

        </div>
      </div>
    </div>
  );
}

export default Products;




