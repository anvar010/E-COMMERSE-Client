import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";
import logo from "../../assets/logo.png";

function AddProduct() {
  const [image, setImage] = useState({});
  const [uploading, setUploading] = useState(false);

  const handleImage = async (e) => {
    const file = e.target.files[0];
    let formData = new FormData();
    formData.append('image', file);
    setUploading(true);
    try {
      const { data } = await axios.post("http://localhost:8000/api/v1/all/upload-image", formData);
      setUploading(false);
      setImage({
        url: data.url,
        public_id: data.public_id
      });
      toast.success("Successfully uploaded");
    } catch (error) {
      console.error(error);
      setUploading(false);
      toast.error("Failed to upload image");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const price = form.price.value;
    const category = form.category.value;
    const stock = form.stock.value;
    const location = form.location.value;
    const description = form.description.value;
    const productImage = image?.url;
  
   
    if (!name || !price || !category || !stock || !location || !description || !productImage) {
      toast.error("Please fill in all fields and upload an image.");
      return;
    }
  
    if (category === "default") {
      toast.error("Please select a category.");
      return;
    }
  
   
    const productData = { name, price, category, stock, location, description, productImage };
  
    try {
      const res = await axios.post("http://localhost:8000/api/v1/product/addproduct", productData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        },
      });
      if (res.data.success) {
        toast.success(res.data.message);
        form.reset();
        setImage({});
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to add product");
    }
  };
  
  

  return (
    <div className='addproduct'>
      <div className='w-full mx-auto pt-[16vh]'>
        <form className='ease-in duration-300 w-[80%] sm:w-max shadow-sm backdrop-blur-md bg-white/80 lg:w-max mx-auto rounded-md px-8 py-5' onSubmit={handleSubmit}>
          <NavLink to='/'>
            <img src={logo} alt="Logo" className='logo mb-6 cursor-pointer mx-auto text-center w-24 h-24' />
          </NavLink>
          <div className="grid grid-cols-2 sm:grid-cols-2 items-center gap-4">
            <input type="text" name='name' placeholder='Enter product name' className='shadow-sm bg-white appearance-none border rounded w-full py-3 px-3  text-gray-700 leading-tight focus:outline-none focus:shadow-outline' />
            <input type="file" name='myFile' className="file-input file-input-bordered bg-red-500 text-white file-input-md w-full" onChange={handleImage} />
            <input type="number" name='price' placeholder='Enter price' className='shadow-sm bg-white appearance-none border rounded w-full py-3 px-3  text-gray-700 leading-tight focus:outline-none focus:shadow-outline' />
            <select className="select bg-red-500 text-white select-md w-full max-w-xs" name='category' defaultValue="default">
              <option value="default" disabled>Category</option>
              <option value="Dress">Dress</option>
              <option value="Shoes">Shoes</option>
              <option value="Facewash">Facewash</option>
              <option value="Watch">Watch</option>
              <option value="Glass">Glass</option>
            </select>
            <input type="number" name='stock' placeholder='Enter stock' className='shadow-sm bg-white appearance-none border rounded w-full py-3 px-3  text-gray-700 leading-tight focus:outline-none focus:shadow-outline' />
            <input type="text" name='location' placeholder='Enter location' className='shadow-sm bg-white appearance-none border rounded w-full py-3 px-3  text-gray-700 leading-tight focus:outline-none focus:shadow-outline' />
            <textarea className="textarea textarea-ghost shadow-sm bg-white appearance-none border rounded w-full py-3 px-3 col-span-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" name='description' placeholder="Enter description"></textarea>
          </div>
          <button className='bg-[#f54748] active:scale-90 transition duration-150 transform hover:shadow-xl shadow-md w-full rounded-full px-8 py-2 text-xl font-medium text-white mx-auto text-center mb-3 mt-5' type='submit'>Add Product</button>
          <ToastContainer />
        </form>
      </div>
    </div>
  );
}

export default AddProduct;
