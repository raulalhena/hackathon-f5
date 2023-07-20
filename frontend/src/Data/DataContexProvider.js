// import React, { createContext } from 'react';

// export const DataContext = createContext();

// export function DataContextProvider({ children }) {

//     const getGlobalProducts = async () => {
//         const response = await fetch(`http://localhost:4000/products/`)
//         const data = await response.json()
//         console.log (data)
//         // .then((response) => response.json())
//         // .then((data) => { 
//         //   const productsData = data.map((item) => ({
//         //     id: item._id,
//         //     name: item.name,
//         //     price: item.price,
//         //     img: item.img,
//         //     description: item.description,
//         //   }));
//         //   console.log(productsData);
//         //   setAllProducts(productsData);
//         // })
//         // .catch((error) => console.log(error));
// 	}; 
//     getGlobalProducts()

//     // const getProductsByID = async (id) => {

//     //     const baseURL = "http://localhost:4000/products/"
//     //         const res = await fetch(`${baseURL}/${id}`)
//     //         const data = await res.json();
            
//     //         return data
//     // } 
//     // getProductsByID()

    const getGlobalProducts = async () => {
        const response = await fetch(`http://localhost:4000/products/search?filteredBy=&keyword=&sortedBy=createdAt`)
        const result = await response.json()
        console.log (result)

        }; 
    getGlobalProducts()

    const getProductsByID = async (id) => {

        const baseURL = "http://localhost:4000/products/"
            const res = await fetch(`${baseURL}/${id}`)
            const data = await res.json();
            
            return data
    } 
    getProductsByID()


<<<<<<< HEAD
//     return (
//         <DataContext.Provider>
//             {children}
//         </DataContext.Provider>
//     );
// }



import { useEffect, useState } from 'react';
import { ProductContext } from './ProductContext';


export const ProductProvider = ({ children }) => {
	
    const [allProducts, setAllProducts] = useState([]);

    const [active, setActive] = useState(false);
    
    // const { valueSearch, onInputChange, onResetForm } = useForm({
    //         valueSearch: '',
    // });
    
    const getGlobalProducts = async () => {
        fetch('http://localhost:4000/products/search?filteredBy=&keyword=&sortedBy=createdAt')
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
=======
    return (
        <DataContext.Provider>
            {children}
        </DataContext.Provider>
    );
}
>>>>>>> 8e744652a8f094efade8b24c8910fac1ee0f6f14
