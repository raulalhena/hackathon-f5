
import './App.css';
import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Pages/Home';
import ProductDetail from './Pages/ProductDetail';
import { DataContext } from './Data/DataContexProvider';
import Footer from './Components/Footer/Footer';



function App() {


  return (
    <Router>
      {/* <Header /> */}
      <Routes>
        <Route exact path="/Home" element={< Home />} />
        <Route exact path="/ProductDetail" element={< ProductDetail />} />
        <Route exact path="/" element={< page />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
