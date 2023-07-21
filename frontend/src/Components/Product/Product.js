import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { ProductContext } from "../../Data/ProductContext";
import "./products.css";
import FavoriteButton from "../heart_fav/FavoriteButton";

const Product = ({ product }) => {

  const { toggleFavorite } = useContext(ProductContext)

  const handleHeartClick = async () => {

  }

  console.log(product.image, product.price, product.name, product.id);
  return (
    <div className="product-container">
      <Link to={`/product/${product.id}`}>
        <div className="product__img">
          <img src={product.image} alt={product.name} />
        </div>
      </Link>
      <div><FavoriteButton onClick={ handleHeartClick } /></div>
      <div className="product__details">
        <h1>{product.name}</h1>
        <p className="price">${product.price}</p>
      </div>
      <Link to={`/ProductDetail/${product.id}`} className="btn">
        Ver Detalle
      </Link>
    </div>
  );
};

export default  Product;