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
            {/* <div className="food-card  bg-red-500/10 rounded-xl flex flex-col cursor-pointer items-center p-5">
                <div className="relative mb-3">
                    <img src="data:image/jpeg;base64,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" alt="" />
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
                            -translate-y-1/2'>$10</div>
                        </button>
                    </div>
                </div>
                <div className='flex gap-4 items-center'>
                    <p className='text-xl text-center font-bold text-[#f54748]'>
                        Camera
                    </p>
                    <div className='flex text-sm space-x-2 cursor-pointer'>
                        <span className='font-formal text-[#fdc55e]'>4.3</span>
                        <FaStar size={16} className='text-[#fdc55e]'/>
                        <span className='font-medium'>(4)</span>
                    </div>
                </div>
                <button className='bg-[#f54748] active:scale-90 transition duration-150 transform
                hover:shadow-xl shadow-md rounded-full px-8 py-2 text-xl font-medium text-white'>
                    Buy now
                </button>
            </div>

            <div className="food-card  bg-red-500/10 rounded-xl flex flex-col cursor-pointer items-center p-5">
                <div className="relative mb-3">
                    <img src="data:image/jpeg;base64,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" alt="" />
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
                            -translate-y-1/2'>$10</div>
                        </button>
                    </div>
                </div>
                <div className='flex gap-4 items-center'>
                    <p className='text-xl text-center font-bold text-[#f54748]'>
                    Camera
                    </p>
                    <div className='flex text-sm space-x-2 cursor-pointer'>
                        <span className='font-formal text-[#fdc55e]'>4.3</span>
                        <FaStar size={16} className='text-[#fdc55e]'/>
                        <span className='font-medium'>(4)</span>
                    </div>
                </div>
                <button className='bg-[#f54748] active:scale-90 transition duration-150 transform
                hover:shadow-xl shadow-md rounded-full px-8 py-2 text-xl font-medium text-white'>
                    Buy now
                </button>
            </div>

            <div className="food-card  bg-red-500/10 rounded-xl flex flex-col cursor-pointer items-center p-5">
                <div className="relative mb-3">
                    <img src="data:image/jpeg;base64,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" alt="" />
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
                            -translate-y-1/2'>$10</div>
                        </button>
                    </div>
                </div>
                <div className='flex gap-4 items-center'>
                    <p className='text-xl text-center font-bold text-[#f54748]'>
                    Camera
                    </p>
                    <div className='flex texthttps://www.shutterstock.com/image-photo/three-cosmetic-product-mockups-on-600nw-1970466164.jpg-sm space-x-2 cursor-pointer'>
                        <span className='font-formal text-[#fdc55e]'>4.3</span>
                        <FaStar size={16} className='text-[#fdc55e]'/>
                        <span className='font-medium'>(4)</span>
                    </div>
                </div>
                <button className='bg-[#f54748] active:scale-90 transition duration-150 transform
                hover:shadow-xl shadow-md rounded-full px-8 py-2 text-xl font-medium text-white'>
                    Buy now
                </button>
            </div>


            <div className="food-card bg-red-500/10 rounded-xl flex flex-col cursor-pointer items-center p-5">
                <div className="relative mb-3">
                    <img src="data:image/jpeg;base64,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" alt="" />
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
                            -translate-y-1/2'>$10</div>
                        </button>
                    </div>
                </div>
                <div className='flex gap-4 items-center'>
                    <p className='text-xl text-center font-bold text-[#f54748]'>
                    Camera
                    </p>
                    <div className='flex text-sm space-x-2 cursor-pointer'>
                        <span className='font-formal text-[#fdc55e]'>4.3</span>
                        <FaStar size={16} className='text-[#fdc55e]'/>
                        <span className='font-medium'>(4)</span>
                    </div>
                </div>
                <button className='bg-[#f54748] active:scale-90 transition duration-150 transform
                hover:shadow-xl shadow-md rounded-full px-8 py-2 text-xl font-medium text-white'>
                    Buy now
                </button>
            </div> */}
        </div>
    </div>
  
</div>
  )
}

export default SpecialOffers
