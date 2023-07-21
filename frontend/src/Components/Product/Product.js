import React from "react";
import { Link } from "react-router-dom";
import "./products.css";

export const Product = ({ image, name, price, id }) => {
  return (
    <div className="product-container">
      <Link to={`/product/${id}`}>
        <div className="product__img">
          <img src={image} alt={name} />
        </div>
      </Link>
      <div className="product__details">
        <h1>{name}</h1>
        <p className="price">${price}</p>
      </div>
      <Link to={`/product/${id}`} className="btn">
        Ver Detalle
      </Link>
    </div>
  );
};
