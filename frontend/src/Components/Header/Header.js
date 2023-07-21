import React from 'react';
import { Link } from 'react-router-dom';
import './header.css';
import logo from '../../assets/harvest.png';
import NotificationsBox from '../NotificationsBox/NotificationsBox';

const Logo = () => {
  return (
    <Link to="/" className="logo-link">
    <div className="logo-container">
      <img className="logo" src={logo} alt="Logo" />
      </div>
    </Link>
  );
};


const Buttons = () => {
  return (
    <div className="button-container">
      <Link to="/" className="header-button">Regístrate</Link>
      <Link to="/" className="header-button">Información</Link>
    </div>
  );
};

const Header = () => {
  return (
    <header className="header">
      <Logo />
      <NotificationsBox />
      <Buttons />
    </header>
  );
};

export default Header;
