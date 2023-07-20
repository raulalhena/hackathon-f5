
import React, { useContext} from 'react';
import { ProductContext } from '../../Data/ProductContext';
import { Link } from 'react-router-dom';
import './Product.css'

const Product = ({ product}) => {
    const { name, image, price } = product;

    return (

        <div className="cards"> 
        <Link to={`/products/${product.id}`}><img className='img' src={image} alt={name} /></Link>
        <h2 className='name'>{name}</h2>
        <p className='price'>${price}</p>
        </div>

    );
};

export default Product;