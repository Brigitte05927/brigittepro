import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { jsPDF } from 'jspdf';

function exportToCSV(products, filename = 'products.csv') {
  const headers = ['Nom', 'Quantité', 'Stock Min', 'Prix (€)'];
  const rows = products.map(p => [p.name, p.quantity, p.minQuantity, p.price.toFixed(2)]);

  let csvContent = 'data:text/csv;charset=utf-8,' + headers.join(',') + '\n' + rows.map(e => e.join(',')).join('\n');

  const encodedUri = encodeURI(csvContent);
  const link = document.createElement('a');
  link.setAttribute('href', encodedUri);
  link.setAttribute('download', filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

export default function ProductList() {
  const [products, setProducts] = useState([
    { id: 1, name: 'Produit A', quantity: 10, minQuantity: 5, price: 12.5 },
    { id: 2, name: 'Produit B', quantity: 4, minQuantity: 6, price: 8.0 }
  ]);

  const [editProduct, setEditProduct] = useState(null);
  const navigate = useNavigate(); // ✅ Hook utilisé correctement ici

  const handleDelete = (id) => {
    const updated = products.filter(p => p.id !== id);
    setProducts(updated);
  };

  const handleEdit = (product) => setEditProduct(product);

  const handleTransaction = (id) => {
    navigate(`/transaction/${id}`); // ✅ Redirection vers la page transaction
  };

  const handleReport = () => {
    const doc = new jsPDF();
    doc.text('Rapport des Produits', 20, 10);
    let y = 20;
    products.forEach(p => {
      doc.text(`Nom: ${p.name} | Quantité: ${p.quantity} | Stock Min: ${p.minQuantity} | Prix: ${p.price.toFixed(2)} €`, 20, y);
      y += 10;
    });
    doc.save('products_report.pdf');
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    setProducts(products.map(p => (p.id === editProduct.id ? editProduct : p)));
    setEditProduct(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditProduct({
      ...editProduct,
      [name]: ['price', 'quantity', 'minQuantity'].includes(name) ? parseFloat(value) : value
    });
  };

  return (
    <>
      <style>{`
        body {
          margin: 0;
          font-family: 'Segoe UI', sans-serif;
          background: linear-gradient(to right top, #dfe9f3, #ffffff);
        }
        .container {
          padding: 40px;
        }
        .title {
          text-align: center;
          color: #2b6777;
          font-size: 2.5em;
          margin-bottom: 30px;
          font-weight: bold;
        }
        table {
          width: 100%;
          border-collapse: collapse;
          background: white;
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 10px 30px rgba(0,0,0,0.1);
        }
        th, td {
          padding: 16px;
          text-align: center;
        }
        th {
          background-color: #2b6777;
          color: white;
        }
        tr:nth-child(even) {
          background-color: #f2f2f2;
        }
        .actions button {
          display: block;
          margin: 6px auto;
          padding: 8px 12px;
          border: none;
          border-radius: 6px;
          cursor: pointer;
          font-size: 0.9em;
          transition: 0.3s ease;
          width: 80%;
        }
        .edit { background-color: #f4a261; color: white; }
        .delete { background-color: #e76f51; color: white; }
        .transaction { background-color: #2a9d8f; color: white; }
        .report { background-color: #264653; color: white; }
        .csv { background-color: #1d3557; color: white; }

        .edit:hover, .delete:hover, .transaction:hover, .report:hover, .csv:hover {
          opacity: 0.85;
        }

        .modal {
          position: fixed;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          background: white;
          padding: 20px;
          box-shadow: 0 10px 30px rgba(0,0,0,0.2);
          border-radius: 8px;
          z-index: 1000;
          width: 300px;
        }

        .overlay {
          position: fixed;
          top: 0; left: 0;
          width: 100%; height: 100%;
          background: rgba(0, 0, 0, 0.3);
          z-index: 999;
        }

        .modal input {
          display: block;
          margin-bottom: 10px;
          padding: 8px;
          width: 100%;
        }
      `}</style>

      <div className="container">
        <h2 className="title">Liste des Produits</h2>

        <table>
          <thead>
            <tr>
              <th>Nom</th>
              <th>Quantité</th>
              <th>Stock Min</th>
              <th>Prix (€)</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map(p => (
              <tr key={p.id}>
                <td>{p.name}</td>
                <td>{p.quantity}</td>
                <td>{p.minQuantity}</td>
                <td>{p.price.toFixed(2)}</td>
                <td className="actions">
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    {/* Ligne 1 */}
                    <div style={{ display: 'flex', gap: '6px', marginBottom: '8px' }}>
                      <button className="edit" onClick={() => handleEdit(p)}>Modifier</button>
                      <button className="delete" onClick={() => handleDelete(p.id)}>Supprimer</button>
                      <button className="transaction" onClick={() => handleTransaction(p.id)}>Transaction</button>
                    </div>
                    {/* Ligne 2 */}
                    <div style={{ display: 'flex', gap: '6px' }}>
                      <button className="csv" onClick={() => exportToCSV([p])}>Exporter CSV</button>
                      <button className="report" onClick={() => {
                        const doc = new jsPDF();
                        doc.text(`Rapport - ${p.name}`, 20, 10);
                        doc.text(`Quantité: ${p.quantity}`, 20, 20);
                        doc.text(`Stock Min: ${p.minQuantity}`, 20, 30);
                        doc.text(`Prix: ${p.price.toFixed(2)} €`, 20, 40);
                        doc.save(`${p.name}_rapport.pdf`);
                      }}>Exporter PDF</button>
                    </div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {editProduct && (
        <>
          <div className="overlay" onClick={() => setEditProduct(null)} />
          <div className="modal">
            <h3>Modifier Produit</h3>
            <form onSubmit={handleEditSubmit}>
              <input name="name" value={editProduct.name} onChange={handleChange} placeholder="Nom" required />
              <input type="number" name="quantity" value={editProduct.quantity} onChange={handleChange} placeholder="Quantité" required />
              <input type="number" name="minQuantity" value={editProduct.minQuantity} onChange={handleChange} placeholder="Stock min" required />
              <input type="number" name="price" value={editProduct.price} onChange={handleChange} step="0.01" placeholder="Prix" required />
              <button type="submit">Sauvegarder</button>
            </form>
          </div>
        </>
      )}
    </>
  );
}
