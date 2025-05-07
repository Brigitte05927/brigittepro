import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import Layout from './components/Layout/Layout'; // Assure-toi d'avoir un Layout avec <Outlet />
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import Dashboard from './pages/Dashboard';

@@ -11,11 +11,14 @@ import './App.css';
function App() {
  return (
    <Routes>
      {/* Pages publiques (hors layout) */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/" element={<Login />}>
        <Route index element={<Dashboard />} />
        <Route path="products" element={<ProductsPage />} />

      {/* Pages privées (avec Layout commun) */}
      <Route path="/" element={<Layout />}> {/* Remplace Login par Layout */}
        <Route index element={<Dashboard />} />         // http://localhost:3000/
        <Route path="products" element={<ProductsPage />} />      // http://localhost:3000/products
        <Route path="transactions" element={<TransactionsPage />} />
        <Route path="reports" element={<ReportsPage />} />
      </Route>

@@ -23,6 +26,4 @@ function App() {
  );
}



export default App;