import React from 'react';

const sampleReports = [
  { date: "2025-05-01", product: "Savon Bio", type: "entrée", quantity: 10 },
  { date: "2025-05-02", product: "Shampoing", type: "sortie", quantity: 5 },
];

const ReportPage = () => {
  return (
    <div className="container">
      <h2>📊 Historique des Transactions</h2>
      <table>
        <thead>
          <tr>
            <th>Date</th><th>Produit</th><th>Type</th><th>Quantité</th>
          </tr>
        </thead>
        <tbody>
          {sampleReports.map((rep, index) => (
            <tr key={index}>
              <td>{rep.date}</td>
              <td>{rep.product}</td>
              <td>{rep.type}</td>
              <td>{rep.quantity}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <style>{`
        .container {
          padding: 40px;
          background: linear-gradient(to right, #e0f2fe, #f0fdf4);
          min-height: 100vh;
          font-family: sans-serif;
        }
        h2 {
          color: #0c4a6e;
        }
        table {
          width: 100%;
          border-collapse: collapse;
          background: white;
          border-radius: 8px;
          box-shadow: 0 0 10px rgba(0,0,0,0.1);
        }
        th, td {
          padding: 10px;
          border-bottom: 1px solid #ccc;
          text-align: center;
        }
        th {
          background-color: #059669;
          color: white;
        }
      `}</style>
    </div>
  );
};

export default ReportPage;
