import React, { useEffect, useState } from 'react';

const ReportPage = () => {
  const [lowStockProducts, setLowStockProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Appel API pour récupérer les produits à stock faible
    fetch('http://localhost:8080/api/reports/low-stock')
      .then(res => res.json())
      .then(data => {
        setLowStockProducts(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Erreur lors de la récupération des produits à stock faible:", err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="container">
      <h2>📉 Produits à Stock Faible</h2>

      {loading ? (
        <p>Chargement...</p>
      ) : lowStockProducts.length === 0 ? (
        <p>Aucun produit en stock faible.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Nom</th>
              <th>Quantité</th>
              <th>Seuil Minimum</th>
            </tr>
          </thead>
          <tbody>
            {lowStockProducts.map((product, index) => (
              <tr key={index}>
                <td>{product.name}</td>
                <td>{product.quantity}</td>
                <td>{product.minQuantity}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <style>{`
        .container {
          padding: 40px;
          background: linear-gradient(to right, #fef9c3, #fde68a);
          min-height: 100vh;
          font-family: 'Segoe UI', sans-serif;
        }
        h2 {
          color: #92400e;
          text-align: center;
          margin-bottom: 20px;
        }
        table {
          width: 100%;
          border-collapse: collapse;
          background: white;
          border-radius: 8px;
          box-shadow: 0 0 10px rgba(0,0,0,0.1);
        }
        th, td {
          padding: 12px;
          border-bottom: 1px solid #ccc;
          text-align: center;
        }
        th {
          background-color: #f59e0b;
          color: white;
        }
        tr:nth-child(even) {
          background-color: #fef3c7;
        }
      `}</style>
    </div>
  );
};

export default ReportPage;
