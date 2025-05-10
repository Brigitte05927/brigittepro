import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const TransactionPage = () => {
  const { id } = useParams();
  const [form, setForm] = useState({
    productId: '',
    type: 'entrée',
    quantity: 0,
  });
  const [message, setMessage] = useState('');

  useEffect(() => {
    setForm(prev => ({ ...prev, productId: id }));
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:8080/api/transactions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      if (response.ok) {
        setMessage("✅ Transaction enregistrée !");
        setForm({ ...form, quantity: 0 }); // reset quantité
      } else {
        setMessage("❌ Erreur lors de l'enregistrement.");
      }
    } catch (error) {
      console.error(error);
      setMessage("❌ Erreur de connexion.");
    }
  };

  return (
    <div className="container">
      <h2>💰 Nouvelle Transaction</h2>
      <p>Produit concerné : <strong>{id}</strong></p>

      <form onSubmit={handleSubmit}>
        <label>
          Type de transaction :
          <select value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })}>
            <option value="entrée">Entrée</option>
            <option value="sortie">Sortie</option>
          </select>
        </label>
        <label>
          Quantité :
          <input
            type="number"
            value={form.quantity}
            onChange={(e) => setForm({ ...form, quantity: e.target.value })}
            required
          />
        </label>
        <button type="submit">Valider</button>
      </form>

      {message && <p style={{ marginTop: '15px', fontWeight: 'bold' }}>{message}</p>}

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
      `}</style>
    </div>
  );
};

export default TransactionPage;
