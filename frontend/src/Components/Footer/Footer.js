import React from 'react';
import { Link } from 'react-router-dom';
import './footer.css';

const Buttons = () => {
return (
    <div className="Footer-Left">
    <Link to="/" className="t-button hover-t-buttons">Sobre Nosotros</Link>
    <Link to="/" className="t-button hover-t-buttons">Contacto</Link>
    </div>
);
};
const Pages = () => {
    return (
        <div className='Footer-Right'>
        <div className='twitter'>
          <img className="logoRs" src={LogoTwitter} alt="LogoTwitter" />
          <Link to="https://twitter.com/?lang=es/" className="rs-button">Twitter</Link>
        </div>
        <div className='facebook'>
          <img className="logoRs" src={LogoFacebook} alt="LogoFacebook" />
          <Link to="https://es-es.facebook.com/" className="rs-button">Facebook</Link>
        </div>
      </div>
    );
  };

    const Footer = () => {
    return (
        <footer className="footer">
        <Pages />
        <Buttons />
        </footer>
    );
    };

export default Footer;