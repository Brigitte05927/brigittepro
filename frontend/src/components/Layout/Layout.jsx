import { Outlet } from 'react-router-dom';
import Header from './Header';
import Sidebar from './Sidebar';
import './Layout.css';

function Layout() {
  return (
    <div className="app-layout">
      <Header />
      <div className="main-content">
        <Sidebar />
        <div className="content-area">
          {/* Le Outlet DOIT rester ici pour afficher les pages */}
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default Layout;