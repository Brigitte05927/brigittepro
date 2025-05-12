import React from 'react';
import { useLocation } from 'react-router-dom';

const ReportPage = () => {
  const location = useLocation();
  const reports = location.state?.reports || [];

  console.log("Rapports reçus :", reports); // Pour déboguer

  return (
    <div className="container">
      <h2>📊 Historique des Transactions</h2>
      {reports.length === 0 ? (
        <p>Aucun rapport disponible.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Produit</th>
              <th>Type</th>
              <th>Quantité</th>
            </tr>
          </thead>
          <tbody>
            {reports.map((rep, index) => (
              <tr key={index}>
                <td>{rep.date}</td>
                <td>{rep.product}</td>
                <td>{rep.type}</td>
                <td>{rep.quantity}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <style>{`
        .container {
          padding: 40px;
          background: linear-gradient(to right, #e0f2fe, #f0fdf4);
          min-height: 100vh;
          font-family: 'Segoe UI', sans-serif;
        }
        h2 {
          color: #0c4a6e;
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
          background-color: #059669;
          color: white;
        }
        tr:nth-child(even) {
          background-color: #f9f9f9;
        }
      `}</style>
    </div>
  );
};

export default ReportPage;
