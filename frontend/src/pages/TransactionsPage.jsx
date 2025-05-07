import { useState, useEffect } from 'react';
import TransactionList from '../components/Transactions/TransactionList';
import TransactionForm from '../components/Transactions/TransactionForm';
import { apiRequest } from '../services/api';
import { useAuth } from '../services/auth';


function TransactionsPage() {
  const [transactions, setTransactions] = useState([]);
  const { token } = useAuth();

  useEffect(() => {
    fetchTransactions();
  }, [token]);

  const fetchTransactions = async () => {
    try {
      const data = await apiRequest('/transactions', 'GET', null, token);
      setTransactions(data);
    } catch (error) {
      console.error('Error fetching transactions:', error);
    }
  };

  const handleTransactionCreated = (newTransaction) => {
    setTransactions(prev => [newTransaction, ...prev]);
  };

  return (
    <div className="transactions-page">
      <h2>Transactions</h2>
      
      <div className="transaction-content">
        <TransactionForm onTransactionCreated={handleTransactionCreated} />
        <TransactionList transactions={transactions} />
      </div>
    </div>
  );
}

export default TransactionsPage;