import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";
import { useUserContext } from '../../context/userContext';

function Profile() {
  const [image, setImage] = useState({});
  const { user, setUser } = useUserContext();
  const [uploading, setUploading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (user && user.profileImage) {
      setImage({
        url: user.profileImage + `?t=${new Date().getTime()}`, // Cache busting
        public_id: user.public_id || ""
      });
    }
  }, [user]);

  const handleImage = async (e) => {
    const file = e.target.files[0];
    let formData = new FormData();
    formData.append('image', file);
    setUploading(true);
    try {
        const { data } = await axios.post("http://localhost:8000/api/v1/all/upload-image", formData);
        setUploading(false);
        setImage({
            url: data.url + `?t=${new Date().getTime()}`, 
            public_id: data.public_id
        });
        toast.success("Image uploaded successfully");
    } catch (error) {
        setUploading(false);
        console.error(error);
        toast.error("Failed to upload image");
    }
};
const handleOnSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const country = form.country.value;
    const city = form.city.value;
    const state = form.state.value;
    const zipCode = form.zipCode.value;
    const profileImage = image?.url;

    try {
        const res = await axios.put("http://localhost:8000/api/v1/user/update", {
            userId: user._id,
            name,
            country,
            city,
            state,
            zipCode,
            profileImage
        }, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        });

        if (res.data.success) {
            toast.success(res.data.message);
            setUser(res.data.data.user);
            form.reset();
            navigate("/");
        } else {
            toast.error(res.data.message);
        }
    } catch (error) {
        console.error(error);
        // toast.error("Failed to update profile");
    }
};

  const handleToggleUserType = async () => {
    const confirmation = window.confirm(`Are you sure you want to change your user type to ${user?.type === 'buyer' ? 'seller' : 'buyer'}?`);

    if (confirmation) {
      try {
        const res = await axios.put(`http://localhost:8000/api/v1/user/switch-user/${user._id}`, {}, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
          }
        });

        if (res.data.success) {
          toast.success("Confirmation message: User type change initiated!");

          setUser(res.data.data.user);

         
          if (res.data.data.user.type === 'seller') {
            toast.success("Congratulations! You are now a seller. Welcome to the seller dashboard where you can manage your products and listings."); 
          } else {
           
          }
        } else {
         
          if (res.data.message) {
            toast.error(res.data.message);
          } else {
            toast.error("Failed to toggle user type");
          }
        }
      } catch (error) {
        
        console.error(error);
        toast.error("Failed to toggle user type");
      }
    } else {
      
      toast.info("User type change canceled.");
    }
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="profile">
      <div className="w-full mx-auto pt-[16vh]">
        <form className="ease-in duration-300 w-[80%] sm:w-max shadow-sm backdrop-blur-md bg-white/80 lg:w-max mx-auto rounded-md px-8 py-5" onSubmit={handleOnSubmit}>
             <label htmlFor="file-upload" className="custom-file-upload">
                        <img src={image?.url || user?.profileImage || "default-profile-image-url"} onError={(e) => { e.target.onerror = null; e.target.src = "fallback-image-url" }} alt="Profile" className="h-32 w-32 bg-contain rounded-full mx-auto cursor-pointer" />
                    </label>
                    <label className="block text-center text-gray-900 text-base mb-2">Profile Picture</label>
                    <input type="file" label="Image" name="myFile" id="file-upload" className="hidden" accept=".jpeg, .png, .jpg" onChange={handleImage} />

                    <div className="grid grid-cols-2 sm:grid-cols-2 items-center gap-4">
                        <input type="text" name="name" placeholder={user?.name || "Name"} className="shadow-sm bg-white appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                        <input type="email" disabled name="email" placeholder={user?.email} className="shadow-sm bg-white appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                        <input type="text" name="country" placeholder={user?.country || "Country"} className="shadow-sm bg-white appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                        <input type="text" name="city" placeholder={user?.city || "City"} className="shadow-sm bg-white appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                        <input type="text" name="state" placeholder={user?.state || "State"} className="shadow-sm bg-white appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                        <input type="text" name="zipCode" placeholder={user?.zipCode || "Zip Code"} className="shadow-sm bg-white appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                    </div>

          <button className="bg-[#f54748] active:scale-90 transition duration-150 transform hover:shadow-xl shadow-md w-full rounded-full px-8 py-2 text-xl font-medium text-white mx-auto text-center mb-3 mt-5" type="submit">
            Update Profile
          </button>

          <button type="button" onClick={handleToggleUserType} className="bg-[#f54748] active:scale-90 transition duration-150 transform hover:shadow-xl shadow-md w-full rounded-full px-8 py-2 text-xl font-medium text-white mx-auto text-center mb-3 mt-5">
            Change user to {user?.type === 'buyer' ? 'seller' : 'buyer'}
          </button>

          <ToastContainer />
        </form>
      </div>
    </div>
  );
}

export default Profile;
