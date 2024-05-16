import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import { UserProvider } from '../context/userContext.jsx'
import { ProductProvider } from '../context/productContext.jsx'
import { CartProvider } from '../context/cartContext.jsx'

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
    </BrowserRouter>
  </React.StrictMode>,
)
