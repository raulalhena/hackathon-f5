<<<<<<< HEAD

=======
>>>>>>> 48b9e28f847cc80e5f8b68a1c4320eb0f548337b
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
            const productsData = data.data.map((item) => ({
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

<<<<<<< HEAD
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
=======
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

}
>>>>>>> 48b9e28f847cc80e5f8b68a1c4320eb0f548337b
