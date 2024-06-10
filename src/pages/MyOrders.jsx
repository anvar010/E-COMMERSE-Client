import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useUserContext } from '../../context/userContext';
import { useProductContext } from '../../context/productContext';

const MyOrders = () => {
    const { user } = useUserContext();
    const { product, setProduct } = useProductContext();
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    throw new Error('Token not found');
                }

                const response = await axios.get('http://localhost:8000/api/v1/order/my-orders', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                if (response.status !== 200) {
                    throw new Error('Network response was not ok');
                }

                setOrders(response.data.data.orders);
            } catch (error) {
                setError(error.message || 'Internal server error');
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, []);

    const getProducts = async () => {
        const token = localStorage.getItem('token');
        try {
            const res = await axios.get(`http://localhost:8000/api/v1/product/getAllProduct`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            if (res.data.success) {
                const fetchedProducts = res.data.data.product;
                setProduct(fetchedProducts);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const getProductInfo = (productId) => {
        const foundProduct = product && product.find(item => item._id === productId);
        return foundProduct;
    };

    useEffect(() => {
        if (user) {
            getProducts();
        }
    }, [user]);

    return (
        <div className="container mx-auto p-4 bg-white shadow-md rounded-md mt-24">
            {loading && <p className="text-center">Loading...</p>}
            {error && <p className="text-center text-gray-500">No Orders Found On this Profile</p>}
            {!loading && !error && orders.length === 0 && (
                <p className="text-center">No orders found for this user</p>
            )}
            {!loading && !error && orders.length > 0 && (
                <div className="order-list">
                    <h2 className="text-2xl font-semibold mb-6 text-center">Order Summary</h2>
                    {orders.map(order => {
                       
                        const totalPrice = order.products.reduce((acc, product) => {
                            const productInfo = getProductInfo(product.productId);
                            return acc + (productInfo ? productInfo.price : 0);
                        }, 0);

                        // Adding delivery charge
                        const deliveryCharge = 20;
                        const totalWithDelivery = totalPrice + deliveryCharge;

                        return (
                            <div key={order._id} className="order-card shadow-md rounded-md mb-8 border-2 border-gray-300">
                                <div className="order-details p-6 flex flex-col md:flex-row md:items-center md:justify-between">
                                    <div className="flex flex-col md:flex-row md:space-x-6 items-start md:items-center">
                                        <p className="font-semibold">Order ID: #{order._id}</p>
                                        <p>
                                            {order.paymentCard && (
                                                <span>Paid using credit card ending with: ****{order.paymentCard.slice(-4)}</span>
                                            )}
                                        </p>
                                    </div>
                                </div>
                                <div className="order-items p-6 border-t border-gray-200">
                                    <ul className="list-none">
                                        {order.products.map(product => {
                                            const productInfo = getProductInfo(product.productId);
                                            return (
                                                <li key={product.productId} className="order-item flex items-center space-x-6 mb-4">
                                                  
                                                    {productInfo && (
                                                        <img
                                                            src={productInfo.productImages[0]}
                                                            alt={productInfo.name}
                                                            className="w-16 h-16 rounded-full object-cover"
                                                        />
                                                    )}
                                                    <div>
                                                        <p className="font-semibold">{productInfo && productInfo.name}</p>
                                                        <p>${productInfo && productInfo.price}</p>
                                                    </div>
                                                </li>
                                            );
                                        })}
                                    </ul>
                                </div>
                                <div className="order-total p-6 border-t border-gray-300">
                                    <p className="font-semibold text-right">Price: ${totalPrice.toFixed(2)}</p>
                                    <p className="font-semibold text-right">Delivery Charge: ${deliveryCharge.toFixed(2)}</p>
                                    <p className="font-semibold text-right">Total : ${totalWithDelivery.toFixed(2)}</p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
};

export default MyOrders;
