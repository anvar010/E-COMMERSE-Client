import React, { useEffect, useState } from 'react'
import { FaHeart, FaStar } from 'react-icons/fa'
import { useProductContext } from '../../context/productContext'
import axios from 'axios'
import Product from './Product'

function RecommendedProduct() {
    const [ratedproduct,setratedProduct] = useState([])
    const {product,setProduct} = useProductContext()

  const getProducts = async () =>{
    try{
    const res = await axios.get(`http://localhost:8000/api/v1/product/getTopRated`)
    if(res.data.success){
     setratedProduct(res.data.data.product)
  }
}catch(error){
  console.log(error);

  }
  }
//   console.log(newproduct);
  useEffect(()=>{
    getProducts()
  },[ratedproduct])
  return (
    <div className='py-3 px-10 sm:px-4 md:px-6 lg:px-6'>
        <div className='container mx-auto py-[2vh]'>
            <div className="text-2xl md:text-3xl font-bold text-center text-[#2e2e2e] lg:text-4xl">
                Recommended <span className='text-[#f54748]'> Products
                </span>
            </div>
            <div className="grid py-6  gap-8 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1">
           {
            ratedproduct?.map(curElem => <Product key={curElem.id} curElem={curElem}/>)
           }
        </div>
        </div>
      
    </div>
  )
}

export default RecommendedProduct
