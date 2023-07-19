import React, { createContext } from 'react';

export const DataContext = createContext();
export function DataContextProvider({ children }) {


    return (
        <DataContext.Provider>
            {children}
        </DataContext.Provider>
    );
}