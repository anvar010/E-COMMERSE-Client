import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {toast,ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";
import { useUserContext } from '../../context/userContext';

function Profile() {
    const [image,setImage] = useState({})
    const { user, setUser } = useUserContext();
    const [uploading,setUploading] = useState(false)
    const navigate = useNavigate();
    const handleImage = async (e) =>{
        const file = e.target.files[0]
        let formData = new FormData()
        formData.append('image',file)
        setUploading(true)
        try {
            const {data} = await axios.post("http://localhost:8000/api/v1/all/upload-image",formData)
            setUploading(false)
            setImage({
                url:data.url,
                public_id:data.public_id
            })
            toast.success("uploaded image")
        } catch (error) {
            console.log(error);
            
        }
    }
    console.log(image);
    const handleOnSubmit = async (e) =>{
        e.preventDefault()
        const form = e.target;
//         console.log("Name:", form.name.value);
//   console.log("country:", form.country.value);
//   console.log("state:", form.state.value);
//   console.log("city:", form.city.value);
//   console.log("zipcode:", form.zipCode.value);
//   console.log("country:", form.email.value);
        const name = form.name.value;
        // const email = form.email.value
        const country = form.country.value;
        const city = form.city.value
        const state = form.state.value
         const zipCode = form.zipCode.value
        const profileImage = image?.url
        

        try {
            const res = await axios.put("http://localhost:8000/api/v1/user/update",{
                userId:user.user._id,
                name,
                country,
                city,
                state,
                zipCode,
                profileImage

            },{
                headers:{
                    Authorization:`Bearer ${localStorage.getItem("token")}`
                }
            })
            if(res.data.success){
                toast.success(res.data.message);
                 form.reset();
                 location.reload()
                navigate("/")
            }else{
                toast.error(data.message)
            }
        } catch (error) {
            console.log(error);
            
        }
         }
   
  return (
    <div className='profile'>

<div className='w-full mx-auto pt-[16vh]'>
            <form className='ease-in duration-300 w-[80%] sm:w-max shadow-sm backdrop-blur-md
            bg-white/80 lg:w-max mx-auto  rounded-md px-8 py-5' onSubmit={handleOnSubmit}>
                <label htmlFor="file-upload" className='custom-file-upload'>
                    <img src={ image?.url ||user?.user?.profileImage} alt="" className='h-32 w-32
                    bg-contain rounded-full mx-auto cursor-pointer' />
                </label>
                <label className='block text-center text-gray-900
                text-base mb-2'>Profile Picture</label>
                <input type="file"  label="Image" name="myFile" id="file-upload" className='hidden'
                accept='.jpeg .png .jpg' onChange={handleImage} />

<div className="grid grid-cols-2 sm:grid-cols-2 items-center gap-4">
               
               <input type="text" name='name' placeholder={user?.user?.name} className='shadow-sm bg-white appearance-none border rounded
               w-full py-3 px-3  text-gray-700 leading-tight focus:outline-none
               focus:shadow-outline' />
    
     
               <input type="email" disabled name='email' placeholder={user?.user?.email} className='shadow-sm bg-white appearance-none border rounded
               w-full py-3 px-3  text-gray-700 leading-tight focus:outline-none
               focus:shadow-outline' />

<input type="text"  name='country' placeholder={user?.user?.country || "Country"} className='shadow-sm bg-white appearance-none border rounded
               w-full py-3 px-3  text-gray-700 leading-tight focus:outline-none
               focus:shadow-outline' />
     <input type="text"  name='city' placeholder={user?.user?.city || "city"} className='shadow-sm bg-white appearance-none border rounded
               w-full py-3 px-3  text-gray-700 leading-tight focus:outline-none
               focus:shadow-outline' />
               <input type="text"  name='state' placeholder={user?.user?.state || "state"} className='shadow-sm bg-white appearance-none border rounded
               w-full py-3 px-3  text-gray-700 leading-tight focus:outline-none
               focus:shadow-outline' />
               <input type="text"  name='zipCode' placeholder={user?.user?.zipCode || "zipCode "} className='shadow-sm bg-white appearance-none border rounded
               w-full py-3 px-3  text-gray-700 leading-tight focus:outline-none
               focus:shadow-outline' />
     
     
     


            
     
          
           </div>

             
              
                <button className='bg-[#f54748] active:scale-90 transition duration-150 transform
                hover:shadow-xl shadow-md w-full rounded-full px-8 py-2 text-xl font-medium text-white
                mx-auto text-center mb-3 mt-5'  type='submit'>Update Profile
                </button>

               
                <ToastContainer/>

            </form>
        </div>
      
    </div>
  )
}

export default Profile
