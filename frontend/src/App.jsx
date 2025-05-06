import { Link } from 'react-router-dom';

export default function App() {
  return (
    <div style={{
      background: 'linear-gradient(to right, #74ebd5, #acb6e5)',
      minHeight: '100vh',
      padding: '40px',
      fontFamily: 'Segoe UI, sans-serif'
    }}>
      <h1 style={{ textAlign: 'center', color: '#2b2b2b' }}>
        Digital Inventory App for Small Shops
      </h1>
      <p style={{ fontSize: '1.2em', maxWidth: '800px', margin: 'auto' }}>
        Solution simple pour gérer vos stocks, ventes et réapprovisionnements.
      </p>
      <div style={{ textAlign: 'center', marginTop: '30px' }}>
        <Link to="/login" style={{
          padding: '15px 30px',
          backgroundColor: '#2b6777',
          color: 'white',
          textDecoration: 'none',
          borderRadius: '8px'
        }}>
          Connexion Admin
        </Link>
      </div>
    </div>
  );
}
