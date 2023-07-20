
import { useEffect, useState } from 'react';
import { ProductContext } from './ProductContext';


export const ProductProvider = ({ children }) => {
	
    const [allProducts, setAllProducts] = useState([]);

    const [active, setActive] = useState(false);
    
    // const { valueSearch, onInputChange, onResetForm } = useForm({
    //         valueSearch: '',
    // });
    
    const getGlobalProducts = async () => {
        fetch('http://localhost:4000/products/')
        .then((response) => response.json())
        .then((data) => {
            const productsData = data.map((item) => ({
                id: item._id,
                name: item.name,
                price: item.price,
                image: item.image,
                createdAt: item.createdAt,
                description: item.description,
            }));
            console.log(productsData);
            setAllProducts(productsData);
        })
        .catch((error) => console.log(error));
    };

    const getProductsByID = async (id) => {

    const baseURL = "http://localhost:4000/products"
        const res = await fetch(`${baseURL}/${id}`)
        const data = await res.json();
        
        return data
    }

    useEffect(() => {
        getGlobalProducts();
    }, []);
    

    const [filteredProducts, setfilteredProducts] = useState([]);

        return (
            <ProductContext.Provider
                value={{
                    allProducts,
                        
                    active,
                    setActive,
                    
                    filteredProducts,
                    getProductsByID,
                }}
            >
                {children}
            </ProductContext.Provider>
        );
    };
