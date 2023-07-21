import React, { useState } from 'react';
import heartOutline from '../../assets/heartOutline.png';
import heartFilled from '../../assets/heartFilled.png';
import './FavoriteButton.css'

const FavoriteButton = () => {
    const [isFavorite, setIsFavorite] = useState(false);

    const toggleFavorite = () => {
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