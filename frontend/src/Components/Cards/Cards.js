import React, { useContext} from 'react';
import { ProductContext } from '../../Data/ProductContext';
import Product from '../Product/Product';

const Cards = () => {
const {allProducts, filteredProducts} = useContext(ProductContext)

    return (

        <div className="card-container">
            {
            filteredProducts.length ?(
                <>
                {filteredProducts.map((product) => (
                    <Product product={product} />
                ))}
                </>
            ) :(
                <>
                {allProducts.map((product) => (
                    <Product product={product} />
                ))}
                </>
            )
            } 
        </div> 
    )
};

export default Cards;
