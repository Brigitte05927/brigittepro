import { useState, useEffect } from 'react';
import { apiRequest } from '../../services/api';
import { useAuth } from '../../services/auth';
import './TransactionList.css';

function TransactionList() {
  const [transactions, setTransactions] = useState([]);
  const { token } = useAuth();

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const data = await apiRequest('/transactions', 'GET', null, token);
        setTransactions(data);
      } catch (error) {
        console.error('Error fetching transactions:', error);
      }
    };

    fetchTransactions();
  }, [token]);

  return (
    <div className="transaction-list">
      <h3>Transaction History</h3>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Product ID</th>
            <th>Type</th>
            <th>Quantity</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map(tx => (
            <tr key={tx.id}>
              <td>{tx.id}</td>
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
    </div>
  );
}

export default TransactionList;