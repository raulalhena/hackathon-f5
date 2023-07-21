import React, { useState, useContext } from 'react';
import { ProductContext } from '../../Data/ProductContext';
import heartOutline from '../../assets/heartOutline.png';
import heartFilled from '../../assets/heartFilled.png';
import './FavoriteButton.css'

const FavoriteButton = () => {

    const {getFavoritesCategories} = useContext(ProductContext)


    const [isFavorite, setIsFavorite] = useState(false);

    const toggleFavorite = () => {
        if(!isFavorite) {
            getFavoritesCategories();
        }

        setIsFavorite((prevIsFavorite) => !prevIsFavorite);
    };

    return (
    <div onClick={toggleFavorite}>
        <img
        src={isFavorite ? heartFilled : heartOutline}
        alt={isFavorite ? 'Corazón lleno' : 'Corazón vacío'}
        />
    </div>
    );
};

export default FavoriteButton;