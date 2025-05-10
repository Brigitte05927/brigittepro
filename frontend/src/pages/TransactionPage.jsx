import React, { useState } from 'react';

const TransactionPage = () => {
  const [form, setForm] = useState({
    productId: '',
    type: 'entrée',
    quantity: 0,
  });
  const [transactionMessage, setTransactionMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Créez un message de confirmation à afficher
    const message = `Transaction ${form.type} enregistrée pour produit ID ${form.productId}, quantité: ${form.quantity}`;
    
    // Mettez à jour l'état avec ce message
    setTransactionMessage(message);
  };

  return (
    <div className="container">
      <h2>💰 Nouvelle Transaction</h2>
      
      <form onSubmit={handleSubmit}>
        <label>
          ID du Produit :
          <input type="text" value={form.productId} onChange={(e) => setForm({ ...form, productId: e.target.value })} required />
        </label>
        <label>
          Type :
          <select value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })}>
            <option value="entrée">Entrée</option>
            <option value="sortie">Sortie</option>
          </select>
        </label>
        <label>
          Quantité :
          <input type="number" value={form.quantity} onChange={(e) => setForm({ ...form, quantity: e.target.value })} required />
        </label>
        <button type="submit">Valider</button>
      </form>

      {transactionMessage && (
        <div className="confirmation-message">
          <h3>✅ Confirmation</h3>
          <p>{transactionMessage}</p>
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
        .confirmation-message h3 {
          margin: 0;
        }
      `}</style>
    </div>
  );
};

export default TransactionPage;
