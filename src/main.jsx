import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import { UserProvider } from '../context/userContext.jsx'
import { ProductProvider } from '../context/productContext.jsx'
import { CartProvider } from '../context/cartContext.jsx'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
    <UserProvider>
      <ProductProvider>
        <CartProvider>
    <App />
    </CartProvider>
    </ProductProvider>
    </UserProvider>
    <ToastContainer />
    </BrowserRouter>
  </React.StrictMode>,
)
