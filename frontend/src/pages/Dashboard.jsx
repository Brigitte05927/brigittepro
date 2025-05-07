import { useState, useEffect } from 'react';
import { apiRequest } from '../services/api';
import { useAuth } from '../services/auth';
import './Dashboard.css';
import api from '../services/api';
function Dashboard() {
  const [stats, setStats] = useState({
    totalProducts: 0,
    lowStockCount: 0,
    recentTransactions: []
  });
  const { token } = useAuth();

  useEffect(() => {
    fetchDashboardData();
  }, [token]);

  const fetchDashboardData = async () => {
    try {
      const [products, transactions] = await Promise.all([
        apiRequest('/products', 'GET', null, token),
        apiRequest('/transactions?limit=5', 'GET', null, token)
      ]);

      const lowStockCount = products.filter(p => p.quantity < p.minQuantity).length;

      setStats({
        totalProducts: products.length,
        lowStockCount,
        recentTransactions: transactions
      });
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    }
  };

  return (
    <div className="dashboard">
      <h2>Dashboard Overview</h2>
      
      <div className="stats-cards">
        <div className="stat-card">
          <h3>Total Products</h3>
          <p>{stats.totalProducts}</p>
        </div>
        
        <div className="stat-card warning">
          <h3>Low Stock Items</h3>
          <p>{stats.lowStockCount}</p>
        </div>
      </div>

      <div className="recent-transactions">
        <h3>Recent Transactions</h3>
        {stats.recentTransactions.length === 0 ? (
          <p>No recent transactions</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Product ID</th>
                <th>Type</th>
                <th>Quantity</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {stats.recentTransactions.map(tx => (
                <tr key={tx.id}>
                  <td>{tx.productId}</td>
                  <td className={tx.type === 'IN' ? 'type-in' : 'type-out'}>
                    {tx.type}
                  </td>
                  <td>{tx.quantity}</td>
                  <td>{new Date(tx.date).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default Dashboard;