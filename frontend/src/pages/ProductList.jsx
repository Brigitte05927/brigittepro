import React, { useState } from 'react';
import { jsPDF } from 'jspdf';  // Importez jsPDF pour générer un PDF

export default function ProductList() {
  const [products, setProducts] = useState([
    {
      id: 1,
      name: 'Produit A',
      quantity: 10,
      minQuantity: 5,
      price: 12.5
    },
    {
      id: 2,
      name: 'Produit B',
      quantity: 4,
      minQuantity: 6,
      price: 8.0
    }
  ]);

  const [editProduct, setEditProduct] = useState(null);

  const handleDelete = (id) => {
    const updated = products.filter(product => product.id !== id);
    setProducts(updated);
  };

  const handleEdit = (product) => {
    setEditProduct(product);
  };

  const handleTransaction = (id) => {
    setProducts(products.map(p =>
      p.id === id ? { ...p, quantity: p.quantity - 1 } : p
    ));
    alert(`1 unité retirée du produit ID ${id}`);
  };

  const handleReport = () => {
    const doc = new jsPDF();
    doc.text('Rapport des Produits', 20, 10);
    let yPosition = 20;

    products.forEach((product) => {
      doc.text(`Nom: ${product.name} | Quantité: ${product.quantity} | Stock Min: ${product.minQuantity} | Prix: ${product.price.toFixed(2)} €`, 20, yPosition);
      yPosition += 10;
    });

    doc.save('products_report.pdf');  // Sauvegarde du fichier PDF
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    const updated = products.map(p =>
      p.id === editProduct.id ? editProduct : p
    );
    setProducts(updated);
    setEditProduct(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditProduct({ ...editProduct, [name]: name === "price" || name === "quantity" || name === "minQuantity" ? parseFloat(value) : value });
  };

  return (
    <>
      <style>{`
        body {
          margin: 0;
          font-family: 'Segoe UI', sans-serif;
          background: linear-gradient(to bottom right, #74ebd5, #acb6e5);
        }

        .container {
          padding: 40px;
        }

        .title {
          text-align: center;
          color: #2b6777;
          font-size: 2em;
          margin-bottom: 30px;
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
          margin: 0 4px;
          padding: 8px 12px;
          border: none;
          border-radius: 6px;
          cursor: pointer;
          font-size: 0.9em;
        }

        .edit { background-color: #f4a261; color: white; }
        .delete { background-color: #e76f51; color: white; }
        .transaction { background-color: #2a9d8f; color: white; }
        .report { background-color: #264653; color: white; }

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
                  <button className="edit" onClick={() => handleEdit(p)}>Modifier</button>
                  <button className="delete" onClick={() => handleDelete(p.id)}>Supprimer</button>
                  <button className="transaction" onClick={() => handleTransaction(p.id)}>Transaction</button>
                  <button className="report" onClick={() => handleReport(p.id)}>Report</button>
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
