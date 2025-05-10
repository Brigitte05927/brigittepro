import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import App from './App';
import Authentification from './pages/Authentification';
import AddProduct from './pages/AddProduct';
import ProductList from './pages/ProductList';
import CsvExport from './pages/CsvExport';
import TransactionPage from './pages/TransactionPage';



function Main() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/authentification" element={<Authentification />} />
        <Route path="/AddProduct" element={<AddProduct />} />
        <Route path="/ProductList" element={<ProductList />} />
        <Route path="/csv-export/:id" element={<CsvExport />} />
        <Route path="/transaction/:id" element={<TransactionPage />} />
        
      </Routes>
    </Router>
  );
}

export default Main;