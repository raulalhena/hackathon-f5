
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Pages/Home';
import ProductDetail from './Pages/ProductDetail';

function App() {


  return (
    <Router>
      {/* <Header /> */}
      <Routes>
        <Route exact path="/Home" element={< Home />} />
        <Route exact path="/ProductDetail" element={< ProductDetail />} />
        <Route exact path="/" element={< page />} />
      </Routes>
      {/* <Footer /> */}
    </Router>
  );
}

export default App;
