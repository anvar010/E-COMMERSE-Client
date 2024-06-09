import { createContext,useContext, useState } from "react";

const ProductContext = createContext()

const ProductProvider = ({children}) =>{
    const [product,setProduct] = useState(null)

    // const fetchProductDetails = async (productId) => {
    //     if (!product[productId]) {
    //         try {
    //             const response = await axios.get(`http://localhost:8000/api/v1/products/${productId}`);
    //             setProduct((prev) => ({ ...prev, [productId]: response.data.data }));
    //         } catch (error) {
    //             console.error('Failed to fetch product details:', error);
    //         }
    //     }
    // };
    return(
        <ProductContext.Provider value={{product,setProduct}}>
            {
                children
            }

        </ProductContext.Provider>
    )
}
const useProductContext = () => {
    return useContext(ProductContext)
}

export {ProductProvider,useProductContext,ProductContext}