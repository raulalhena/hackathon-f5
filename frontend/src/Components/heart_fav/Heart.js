import React from 'react';
import { Link } from 'react-router-dom';
import './heart.css';
import HeartIcon from '../../assets/img/heart.png';

function HeartComponent() {
  return (
    <Link to="/" className="heart_container">
      <img className="heart-favorites" src={HeartIcon} alt="Favorites heart Icon" />
    </Link>
  );
}

export default HeartComponent;
