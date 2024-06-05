import React, { useEffect, useState } from 'react'
import { FaHeart, FaStar } from 'react-icons/fa'
import { useProductContext } from '../../context/productContext'
import Product from './Product'
import axios from 'axios'
function SpecialOffers() {
    const [specialproduct,setSpecialProduct] = useState([])
    const {product,setProduct} = useProductContext()

  const getProducts = async () =>{
    try{
    const res = await axios.get(`http://localhost:8000/api/v1/product/specialProducts`)
    if(res.data.success){
     setSpecialProduct(res.data.data.product)
  }
}catch(error){
  console.log(error);

  }
  }
//   console.log(specialproduct);
  useEffect(()=>{
    getProducts()
  },[specialproduct])
  return (
    <div className='py-3 px-10 sm:px-4 md:px-6 lg:px-6'>
    <div className='container mx-auto py-[2vh]'>
        <div className="text-2xl md:text-3xl font-bold text-center text-[#2e2e2e] lg:text-4xl">
           Special <span className='text-[#f54748]'> Offers
            </span>
        </div>
        <div className="grid py-6  gap-8 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1">
        {
            specialproduct?.map(curElem => <Product key={curElem.id} curElem={curElem}/>)
           }
          
        </div>
    </div>
  
</div>
  )
}

export default SpecialOffers
