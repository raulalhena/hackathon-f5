
import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Pages/Home';
<<<<<<< HEAD
import { DataContext } from './Data/DataContexProvider';
=======
import ProductDetail from './Pages/ProductDetail';
>>>>>>> 48b9e28f847cc80e5f8b68a1c4320eb0f548337b


function App() {  

  return (
    <Router>
      {/* <Header /> */}
      <Routes>
        <Route exact path="/Home" element={< Home />} />
        
        <Route exact path="/" element={< page />} />
      </Routes>
      {/* <Footer /> */}
    </Router>
  );
}

export default App;
