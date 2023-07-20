

import React, { useContext} from 'react';
import { ProductContext } from '../../Data/ProductContext';
import { Link } from 'react-router-dom';
import Product from '../Product/Product.jsx';
import './Cards.css'


const Cards = () => {
const {allProducts, filteredProducts} = useContext(ProductContext)

    return (

        <div className="card-container">
            {
            filteredProducts.length ?(
                <>
                {filteredProducts.map((product) => (
                    <Product
                    key={product.id}
                    product={product}
                    />
                ))}
                </>
            ) :(
                <>
                {allProducts.map((product) => (
                    <Product
                    key={product.id}
                    product={product}
                    />
                ))}
                </>
            )
            } 
        
        </div>
        
    )
};

export default Cards;
