
import React, { useContext} from 'react';
import { ProductContext } from '../../Data/ProductContext';
import { Link } from 'react-router-dom';

export const Product = ({ product}) => {
    const { name, image, price } = product;

    return (

        <div className="cards"> 
        <Link to={`/products/${product.id}`}><img src={image} alt={name} /></Link>
        <Link to={`/products/${product.id}`}><h2>{name}</h2></Link>
        <p>${price}</p>
        </div>

    );
};

export default Product;