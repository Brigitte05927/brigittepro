import { useState } from 'react';
import { apiRequest } from '../../services/api';
import { useAuth } from '../../services/auth';
import './TransactionForm.css';

function TransactionForm({ onTransactionCreated }) {
  const [formData, setFormData] = useState({
    productId: '',
    type: 'IN',
    quantity: 1
  });
  const { token } = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'quantity' ? Number(value) : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newTransaction = await apiRequest(
        '/transactions',
        'POST',
        formData,
        token
      );
      onTransactionCreated(newTransaction);
      setFormData({
        productId: '',
        type: 'IN',
        quantity: 1
      });
    } catch (error) {
      console.error('Error creating transaction:', error);
    }
  };

  return (
    <div className="transaction-form">
      <h3>Create New Transaction</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Product ID</label>
          <input
            type="number"
            name="productId"
            value={formData.productId}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Transaction Type</label>
          <select
            name="type"
            value={formData.type}
            onChange={handleChange}
          >
            <option value="IN">Stock In</option>
            <option value="OUT">Stock Out</option>
          </select>
        </div>

        <div className="form-group">
          <label>Quantity</label>
          <input
            type="number"
            name="quantity"
            value={formData.quantity}
            onChange={handleChange}
            min="1"
            required
          />
        </div>

        <button type="submit" className="submit-btn">
          Record Transaction
        </button>
      </form>
    </div>
  );
}

export default TransactionForm;