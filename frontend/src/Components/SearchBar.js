import React, { useEffect, useState } from 'react';
import './SearchBar.css';
import Product from './Product/Product';
import Cards from './Cards/Cards';

const SearchBar = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  const handleInputChange = (event) => {
    setQuery(event.target.value);
  };

  const handleSearch = () => {
    // Aquí debes reemplazar 'API_URL' con la URL de tu API de búsqueda
    const apiUrl = `http://localhost:4000/products/search?filteredBy=name&keyword=${query}&sortedBy=`;

    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        console.log(data.data)
        setResults(data.data);
      })
      .catch((error) => {
        console.error('Error al obtener los resultados de búsqueda:', error);
      });
  };

  return (
    <div className="container">
      <nav className="navBar">
        <h1 className="logo">Barra de Búsqueda</h1>
        <div className="searchContainer">
          <input
            type="text"
            placeholder="Buscar..."
            value={query}
            onChange={handleInputChange}
            className="searchInput"
          />
          <button onClick={handleSearch} className="searchButton">
            Buscar
          </button>
        </div>
      </nav>
      <div className="resultsContainer">
        {results.length > 0 ? (
          <ul className="resultsList">
            {results.map((product) => (
              <Product key={product._id} product={product} />
            ))}
          </ul>
        ) : (
          <p className="noResults">No hay resultados</p>
        )}
      </div>
    </div>
  );
};

export default SearchBar;
