import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaHome, FaBox, FaUsers, FaSignOutAlt, FaBell } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';

const AdminPage = () => {
  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState('dashboard');
  const [products, setProducts] = useState([]);
  const [users, setUsers] = useState([]);
  const [userType, setUserType] = useState('buyer');
  const [productCount, setProductCount] = useState('');
  const [userCount, setUserCount] = useState('');
  const [previousProductCount, setPreviousProductCount] = useState(0);
  const [previousUserCount, setPreviousUserCount] = useState(0);
  const [notifications, setNotifications] = useState([]);
  const [showNotifications, setShowNotifications] = useState(false);

  const token = localStorage.getItem('token');

  useEffect(() => {
    if (!token) {
      navigate('/PageNotFound');
    } else {
      fetchProducts();
      fetchUsers();
    }
  }, [token, navigate]);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/v1/product/getAllProduct', {
        params: {
          category: 'all'
        }
      });
      const { data } = response.data;
      const currentProductCount = data.totalProducts;

      if (currentProductCount > previousProductCount) {
        setNotifications([
          ...notifications,
          {
            type: 'product',
            message: `New product(s) added. Total products now: ${currentProductCount}`,
          },
        ]);
      }

      setProducts(data.product);
      setProductCount(currentProductCount);
      setPreviousProductCount(currentProductCount);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/v1/user/alluser', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      const { data } = response.data;
      const currentUserCount = data.totalUsers;

      if (currentUserCount > previousUserCount) {
        setNotifications([
          ...notifications,
          {
            type: 'user',
            message: `New user(s) registered. Total users now: ${currentUserCount}`,
          },
        ]);
      }

      setUsers(data.users);
      setUserCount(currentUserCount);
      setPreviousUserCount(currentUserCount);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const handleViewMode = (mode) => {
    setViewMode(mode);
  };

  const handleUserTypeChange = (type) => {
    setUserType(type);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/admin-login');
  };

  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
  };


  const filteredUsers = users.filter(user => user.type === userType);

  

  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Header */}
      <header className="bg-white shadow-md h-16 flex justify-between items-center px-6">
        <div className="flex items-center">
          <div className="text-green-500 text-lg font-semibold"> Admin Panel</div>
        </div>
        <div className="flex items-center">
          <div className="relative mr-4">
            <button className="ml-4" onClick={toggleNotifications}>
              <FaBell className="w-6 h-6" />
            </button>
            {showNotifications && (
              <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg overflow-hidden z-10">
                <div className="px-4 py-3 border-b border-gray-200">
                  <h2 className="text-lg font-semibold text-gray-800">Notifications</h2>
                </div>
                <div className="divide-y divide-gray-200">
                  {notifications.map((notification, index) => (
                    <div key={index} className="px-4 py-3">
                      <p className="text-sm text-gray-600">{notification.message}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
         
        </div>
      </header>


      {/* Main content */}
      <div className="flex">
        {/* Sidebar */}
        <nav className="bg-white shadow-md h-full w-64 flex flex-col justify-between">
  <div className="py-6 px-4">
    <div
      className={`flex items-center mb-6 cursor-pointer ${
        viewMode === 'dashboard' && 'text-purple-600'
      }`}
      onClick={() => handleViewMode('dashboard')}
    >
      <FaHome className="w-6 h-6 mr-2" />
      <span className="font-semibold">Dashboard</span>
    </div>
    <div
      className={`flex items-center mb-6 cursor-pointer ${
        viewMode === 'products' && 'text-purple-600'
      }`}
      onClick={() => handleViewMode('products')}
    >
      <FaBox className="w-6 h-6 mr-2" />
      <span className="font-semibold">Products</span>
    </div>
    <div
      className={`flex items-center mb-6 cursor-pointer ${
        viewMode === 'users' && 'text-purple-600'
      }`}
      onClick={() => handleViewMode('users')}
    >
      <FaUsers className="w-6 h-6 mr-2" />
      <span className="font-semibold">Users</span>
    </div>
  
    {/* <div
      className={`flex items-center mb-6 cursor-pointer ${
        viewMode === 'settings' && 'text-purple-600'
      }`}
      onClick={() => handleViewMode('settings')}
    >
      <FaCog className="w-6 h-6 mr-2" />
      <span className="font-semibold">Settings</span>
    </div> */}
  </div>
  <div className="py-6 px-4 cursor-pointer" onClick={handleLogout}>
            <div className="flex items-center">
                <FaSignOutAlt className="w-6 h-6 mr-2" />
                <span className="font-semibold">Logout</span>
            </div>
        </div>
</nav>


        {/* Main content area */}
        <main className="flex-1 bg-gray-100 p-6 overflow-y-auto">
          
          {viewMode === 'dashboard' && (
            <div>
              <h1 className="text-2xl font-semibold text-purple-600 mb-4">
                Dashboard Overview
              </h1>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              
              <div className="bg-blue-500 text-white rounded-lg p-6 shadow-md">
      <div className="flex items-center justify-center">
       
        <div className="flex items-center">
          <h2 className="text-3xl font-semibold mr-2">{productCount}</h2>
          <FaBox className="w-8 h-8" />
        </div>
      </div>
      
      
      <p className="text-sm font-medium text-center mt-2">Total Products</p>
    </div>

    <div className="bg-purple-600 text-white rounded-lg p-6 shadow-md">
      <div className="flex items-center justify-center">
       
        <div className="flex items-center">
          <h2 className="text-3xl font-semibold mr-2">{userCount}</h2>
          <FaUsers className="w-8 h-8" />
        </div>
      </div>
      
      
      <p className="text-sm font-medium text-center mt-2">Total Users</p>
    </div>

    
                
                {/* <div className="bg-blue-500 text-white rounded-lg p-6 shadow-md flex items-center justify-between">
                  <div>
                    <h2 className="text-3xl font-semibold">320</h2>
                    <p className="text-sm font-medium">Total Revenue</p>
                  </div>
                  <img
                    src="https://media.geeksforgeeks.org/wp-content/uploads/20221210184645/Untitled-design-(32).png"
                    className="w-12 h-12"
                    alt="revenue-icon"
                  />
                </div>
                <div className="bg-purple-600 text-white rounded-lg p-6 shadow-md flex items-center justify-between">
                  <div>
                    <h2 className="text-3xl font-semibold">70</h2>
                    <p className="text-sm font-medium">New Customers</p>
                  </div>
                  <img
                    src="https://media.geeksforgeeks.org/wp-content/uploads/20221210185029/13.png"
                    className="w-12 h-12"
                    alt="customers-icon"
                  />
                </div> */}
              </div>
              <div className="mt-6">
                {/* <div className="bg-white rounded-lg shadow-md p-6">
                  <h2 className="text-lg font-semibold text-purple-600 mb-4">
                    Recent Orders
                  </h2>
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            Order ID
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            Customer Name
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            Total Amount
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            Status
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        <tr className="bg-white">
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            #12345
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            John Doe
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            $250.00
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            Pending
                          </td>
                        </tr>
                        <tr className="bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            #12346
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            Jane Smith
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            $150.00
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            Shipped
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div> */}
              </div>
            </div>
          )}

          {/* Conditional rendering based on viewMode for Products */}
          {viewMode === 'products' && (
            <div>
              <h1 className="text-2xl font-semibold text-purple-600 mb-4">
                Manage Products
              </h1>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th
                        scope="col"
                        className="px-12 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Image
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Name
                      </th>
                      {/* <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Description
                      </th> */}
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Price
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Disabled
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {products.map((product) => (
                      <tr key={product._id} className="bg-white">
                        <td className="px-6 py-4 whitespace-nowrap">
                        <Link to={`/admin-products/${product._id}`}>
                  <img
                    src={product.productImages[0]}
                    alt={product.name}
                    className="w-24 h-24 object-cover rounded-md cursor-pointer"
                  />
                </Link>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {product.name}
                        </td>
                        {/* <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                          {product.description}
                        </td> */}
                        <td className="px-6 py-4 whitespace-nowrap text-lg font-bold text-gray-900">
                          ${product.price}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-lg font-bold text-gray-900 uppercase">
  {product.disabled ? product.disabled.toString() : 'false'}
</td>

                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}


{viewMode === 'users' && (
            <div>
              <h1 className="text-2xl font-semibold text-purple-600 mb-4">
                Manage Users
              </h1>
             
              <div className="flex justify-between mb-4">
                <button
                  className={`px-4 py-2 rounded ${userType === 'buyer' ? 'bg-purple-600 text-white' : 'bg-gray-200 text-gray-700'}`}
                  onClick={() => handleUserTypeChange('buyer')}
                >
                  Buyer
                </button>
                <button
                  className={`px-4 py-2 rounded ${userType === 'seller' ? 'bg-purple-600 text-white' : 'bg-gray-200 text-gray-700'}`}
                  onClick={() => handleUserTypeChange('seller')}
                >
                  Seller
                </button>
              </div>
              {/* Users table */}
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Name
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Email
                      </th>
                      {/* Add more columns as needed */}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {filteredUsers.map((user) => (
                      <tr key={user._id} className="bg-white">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {user.name}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {user.email}
                        </td>
                        {/* Add more TDs as needed */}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}


          {/* Placeholder content for other view modes */}
          {['orders', 'settings'].includes(viewMode) && (
            <div className="text-center text-lg mt-8">
              Placeholder for {viewMode.charAt(0).toUpperCase() + viewMode.slice(1)} Management
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default AdminPage;
