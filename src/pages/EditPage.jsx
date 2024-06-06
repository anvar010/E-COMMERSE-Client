import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";
import { useUserContext } from '../../context/userContext';

function EditPage() {
    const params = useParams();
    const { user } = useUserContext();
    const [images, setImages] = useState([]);
    const [productDetails, setProductDetails] = useState({});
    const { productId } = useParams();

    useEffect(() => {
        const fetchProductDetails = async () => {
            try {
                const res = await axios.get(`http://localhost:8000/api/v1/product/getProduct/${params.id}`);
                if (res.data.success) {
                    setProductDetails(res.data.data.product);
                }
            } catch (error) {
                console.log(error);
            }
        };

        fetchProductDetails();
    }, [productId, params.id]);

    const handleImage = async (e) => {
        const files = Array.from(e.target.files);
        const uploadedImages = [];

        for (const file of files) {
            let formData = new FormData();
            formData.append('image', file);
            try {
                const { data } = await axios.post("http://localhost:8000/api/v1/all/upload-image", formData);
                uploadedImages.push({
                    url: data.url,
                    public_id: data.public_id
                });
                toast.success("Image uploaded successfully");
            } catch (error) {
                console.error(error);
                toast.error("Failed to upload image");
            }
        }

        setImages([...images, ...uploadedImages]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const form = e.target;
        const name = form.name.value || productDetails.name;
        const price = form.price.value || productDetails.price;
        const category = form.category.value || productDetails.category;
        const stock = form.stock.value || productDetails.stock;
        const location = form.location.value || productDetails.location;
        const description = form.description.value || productDetails.description;
        const productImages = images.map(image => image.url);

        if (!name || !price || !category || !stock || !location || !description || !productImages.length || category === "") {
            toast.error("Please fill in all fields, upload images, and select a category.");
            return;
        }

        const productData = { name, price, category, stock, location, description, productImages };

        try {
            const res = await axios.put(`http://localhost:8000/api/v1/product/updateProduct/${params.id}`, productData, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                },
            });
            if (res.data.success) {
                toast.success("Product updated successfully");
                form.reset();
                setImages([]);
                setProductDetails({});
                form.description.value = '';
            } else {
                toast.error(res.data.message);
            }
        } catch (error) {
            console.error(error);
            toast.error("Failed to update product");
        }
    };

    return (
        <div className='addproduct'>
            <div className='w-full mx-auto pt-[16vh]'>
                <h1 className="text-3xl font-bold text-gray-800 mb-5 text-center white-red-text">Edit <span className='text-[#f54748]'> Product</span> Details</h1>

                <form className='ease-in duration-300 w-[80%] sm:w-max shadow-sm backdrop-blur-md bg-white/80 lg:w-max mx-auto rounded-md px-8 py-5' onSubmit={handleSubmit}>
                    <div className="grid grid-cols-2 sm:grid-cols-2 items-center gap-4">
                        <input type="text" name='name' placeholder='Enter product name' defaultValue={productDetails.name} className='shadow-sm bg-white appearance-none border rounded w-full py-3 px-3  text-gray-700 leading-tight focus:outline-none focus:shadow-outline' />
                        <input type="file" name='myFile' multiple className="file-input file-input-bordered bg-red-500 text-white file-input-md w-full" onChange={handleImage} />
                        <input type="number" name='price' placeholder='Enter price' defaultValue={productDetails.price} className='shadow-sm bg-white appearance-none border rounded w-full py-3 px-3  text-gray-700 leading-tight focus:outline-none focus:shadow-outline' />
                        <select className="select bg-red-500 text-white select-md w-full max-w-xs" name='category' value={productDetails.category || ""} onChange={(e) => setProductDetails({ ...productDetails, category: e.target.value })}>
                            <option value="">Select Category</option>
                            <option value="Dress">Dress</option>
                            <option value="Shoes">Shoes</option>
                            <option value="Facewash">Facewash</option>
                            <option value="Watch">Watch</option>
                            <option value="Glass">Glass</option>
                        </select>
                        <input type="number" name='stock' placeholder='Enter stock' defaultValue={productDetails.stock} className='shadow-sm bg-white appearance-none border rounded w-full py-3 px-3  text-gray-700 leading-tight focus:outline-none focus:shadow-outline' />
                        <input type="text" name='location' placeholder='Enter location' defaultValue={productDetails.location} className='shadow-sm bg-white appearance-none border rounded w-full py-3 px-3  text-gray-700 leading-tight focus:outline-none focus:shadow-outline' />
                        <textarea className="textarea textarea-ghost shadow-sm bg-white appearance-none border rounded w-full py-3 px-3 col-span-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" name='description' placeholder="Enter description" defaultValue={productDetails.description}></textarea>
                    </div>
                    <button className='bg-[#f54748] active:scale-90 transition duration-150 transform hover:shadow-xl shadow-md w-full rounded-full px-8 py-2 text-xl font-medium text-white mx-auto text-center mb-3 mt-5' type='submit'>Submit</button>
                </form>
                <ToastContainer />
            </div>
        </div>
    );
}

export default EditPage;
