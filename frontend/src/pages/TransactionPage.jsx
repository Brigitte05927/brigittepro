import React, { useState } from 'react';
import axios from 'axios';

const TransactionPage = () => {
  const [form, setForm] = useState({
    productId: '',
    type: 'IN',      // Utilise "IN" et "OUT" qui correspondent souvent à la backend
    quantity: 0,
  });
  const [transactionMessage, setTransactionMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setTransactionMessage('');
    setErrorMessage('');

    try {
      // POST vers le backend
      await axios.post('http://localhost:8080/api/transactions', {
        productId: Number(form.productId),
        type: form.type,
        quantity: Number(form.quantity),
      });

      setTransactionMessage(`✅ Transaction ${form.type === 'IN' ? 'entrée' : 'sortie'} enregistrée pour produit ID ${form.productId}, quantité: ${form.quantity}`);
      setForm({ productId: '', type: 'IN', quantity: 0 });
    } catch (error) {
      setErrorMessage("❌ Échec de la transaction : " + (error.response?.data?.message || error.message));
    }
  };

  return (
    <div className="container">
      <h2>💰 Nouvelle Transaction</h2>

      <form onSubmit={handleSubmit}>
        <label>
          ID du Produit :
          <input
            type="number"
            value={form.productId}
            onChange={(e) => setForm({ ...form, productId: e.target.value })}
            required
            min="1"
          />
        </label>

        <label>
          Type :
          <select
            value={form.type}
            onChange={(e) => setForm({ ...form, type: e.target.value })}
          >
            <option value="IN">Entrée</option>
            <option value="OUT">Sortie</option>
          </select>
        </label>

        <label>
          Quantité :
          <input
            type="number"
            value={form.quantity}
            onChange={(e) => setForm({ ...form, quantity: e.target.value })}
            required
            min="1"
          />
        </label>

        <button type="submit">Valider</button>
      </form>

      {transactionMessage && (
        <div className="confirmation-message">
          <h3>Confirmation</h3>
          <p>{transactionMessage}</p>
        </div>
      )}

      {errorMessage && (
        <div className="error-message" style={{color: 'red', marginTop: '15px'}}>
          <p>{errorMessage}</p>
        </div>
      )}

      <style>{`
        .container {
          padding: 40px;
          background: linear-gradient(to left, #a5f3fc, #dbeafe);
          min-height: 100vh;
          font-family: Arial, sans-serif;
        }
        h2 {
          color: #0f172a;
        }
        form {
          display: flex;
          flex-direction: column;
          gap: 15px;
          background: white;
          padding: 20px;
          border-radius: 10px;
          max-width: 400px;
        }
        input, select {
          padding: 8px;
          border-radius: 6px;
          border: 1px solid #ccc;
        }
        button {
          background-color: #2563eb;
          color: white;
          padding: 10px;
          border-radius: 6px;
          cursor: pointer;
        }
        button:hover {
          opacity: 0.9;
        }
        .confirmation-message {
          margin-top: 20px;
          background-color: #d1fae5;
          padding: 15px;
          border-radius: 10px;
          color: #16a34a;
        }
      `}</style>
    </div>
  );
};

export default TransactionPage;
