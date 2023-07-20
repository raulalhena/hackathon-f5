import React, { createContext } from 'react';

export const DataContext = createContext();
export function DataContextProvider({ children }) {

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


    return (
        <DataContext.Provider>
            {children}
        </DataContext.Provider>
    );
}
