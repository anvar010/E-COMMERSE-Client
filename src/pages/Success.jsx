import React from 'react';
import { Link } from 'react-router-dom';
import successGif from '../assets/tick.gif';

function Success() {
  return (
    <div className='pt-[18vh]'>
      <div class="bg-gray-100 h-screen">
        <div class="bg-white p-6  md:mx-auto">
         
          <img src={successGif} alt="Success" className="w-16 h-16 mx-auto my-6" animate-ping duration-5000/>

          <div class="text-center">
            <h3 class="md:text-2xl text-base text-gray-900 font-semibold text-center">Order Placed</h3>
            <p class="text-gray-600 my-2">Thank you for completing your secure online payment.</p>
            <p> Have a great day!  </p>
            <div class="py-10 text-center">
              <Link to="/" class="px-12 bg-red-600 hover:bg-red-500 text-white font-semibold py-3">
                GO BACK 
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Success;
