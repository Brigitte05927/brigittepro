import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout/Layout'; // Assure-toi d'avoir un Layout avec <Outlet />
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import Dashboard from './pages/Dashboard';
import ProductsPage from './pages/ProductsPage';
import TransactionsPage from './pages/TransactionsPage';
import ReportsPage from './pages/ReportsPage';
import './App.css';

function App() {
  return (
    <Routes>
      {/* Pages publiques (hors layout) */}
      <Route path="/" element={<Layout />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Pages privées (avec Layout commun) */}
      <Route path="/" element={<Login />}> {/* Remplace Login par Layout */}
        <Route index element={<Dashboard />} />          {/* http://localhost:3000/*/}
        <Route path="products" element={<ProductsPage />} />       {/* http://localhost:3000/products*/}
        <Route path="transactions" element={<TransactionsPage />} />
        <Route path="reports" element={<ReportsPage />} />
      </Route>
    </Routes>
  );
}

export default App;