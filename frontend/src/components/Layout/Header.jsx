import { useAuth } from '../../services/auth';
import './Header.css';

// Bon


function Header() {
  const { user, logout } = useAuth();

  return (
    <header className="app-header">
      <div className="header-left">
        <h1>Digital Inventory</h1>
      </div>
      <div className="header-right">
        {user && (
          <>
            <span>Welcome, {user.username}</span>
            <button onClick={logout} className="logout-btn">
              Logout
            </button>
          </>
        )}
      </div>
    </header>
  );
}

export default Header;