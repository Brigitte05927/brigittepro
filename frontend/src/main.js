import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import App from './App';
import Authentification from './pages/Authentification';
import AddProduct from './pages/AddProduct';
import ProductList from './pages/ProductList';
import CsvExport from './pages/CsvExport';
import TransactionPage from './pages/TransactionPage';
import ReportPage from './pages/ReportPage';
// src/Main.js
import AuthProvider from './services/AuthProvider';
import EditProduct from './pages/EditProduct';
import GlobalReport from './pages/GlobalReport';






function Main() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/authentification" element={<Authentification />} />
        <Route path="/AddProduct" element={<AddProduct />} />
        <Route path="/ProductList" element={<ProductList />} />
        <Route path="/csv-export/:id" element={<CsvExport />} />
        <Route path="/reportpage" element={<ReportPage />} />
        <Route path="/AuthProvider" element={<AuthProvider />} />
        <Route path="/edit-product/:id" element={<EditProduct />} />
        <Route path="/transaction/:id" element={<TransactionPage />} />
        <Route path="/global-report" element={<GlobalReport />} />
      </Routes>
    </Router>
  );
}

export default Main;