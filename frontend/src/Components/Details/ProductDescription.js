import React from 'react';
import { Link } from 'react-router-dom';
import './details.css';

export const Product = ({
  _id,
  name,
  price,
  description,
  image,
  sellerId,
  category,
  createdAt,
  updatedAt,
}) => {
  return (
    <div className="product-container">
      <Link to={`/product/${_id}`}>
        <div className="product__img">
          <img src={image} alt={name} />
        </div>
      </Link>
      <div className="product__details">
        <h1>{name}</h1>
        <p className="price">${price}</p>
        <p>{description}</p>
        <p>Seller ID: {sellerId}</p>
        <p>Category: {category}</p>
        <p>Created At: {createdAt}</p>
        <p>Updated At: {updatedAt}</p>
      </div>
      <Link to={`/Home/${_id}`} className="btn">
       Volver
      </Link>
    </div>
  );
};
