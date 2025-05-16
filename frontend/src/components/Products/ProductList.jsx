import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaEdit, FaTrash, FaFilePdf, FaFileCsv, FaExchangeAlt, FaChartBar } from 'react-icons/fa';


const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/products');
      console.log("Produits:", response.data);
      setProducts(response.data);
    } catch (error) {
      console.error("Erreur lors du chargement des produits :", error);
    }
  };

  const handleEdit = (id) => {
    console.log("Modifier produit ID :", id);
    // Ajoute ta logique ici
  };

  const handleDelete = (id) => {
    console.log("Supprimer produit ID :", id);
    // Ajoute ta logique ici
  };

  const handleTransaction = (id) => {
    console.log("Transaction pour produit ID :", id);
    // Ajoute ta logique ici
  };

  const handleGeneratePdf = (id) => {
    console.log("Générer PDF pour produit ID :", id);
    // Ajoute ta logique ici
  };

  const handleExportCsv = () => {
    console.log("Exporter en CSV");
    // Ajoute ta logique ici
  };

  const handleGlobalReport = () => {
    console.log("Voir rapport global");
    // Ajoute ta logique ici
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Liste des Produits</h1>
      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.th}>Nom</th>
            <th style={styles.th}>Quantité</th>
            <th style={styles.th}>Stock Min</th>
            <th style={styles.th}>Prix (€)</th>
            <th style={styles.th}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id} style={styles.tr}>
              <td style={styles.td}>
                {product.name && product.name.trim() !== "" ? product.name : "Nom manquant"}
              </td>
              <td style={styles.td}>
                {product.quantity != null ? `${product.quantity} en stock` : "Quantité inconnue"}
              </td>
              <td style={styles.td}>
                {product.minQuantity != null ? product.minQuantity : "N/A"}
              </td>
              <td style={styles.td}>
                {product.price != null ? `${product.price.toFixed(2)} €` : "Prix inconnu"}
              </td>
              <td style={styles.td}>
                <div style={styles.buttonGroup}>
                  <button style={{ ...styles.btn, ...styles.edit }} onClick={() => handleEdit(product.id)}>Modifier</button>
                  <button style={{ ...styles.btn, ...styles.delete }} onClick={() => handleDelete(product.id)}>Supprimer</button>
                  <button style={{ ...styles.btn, ...styles.transaction }} onClick={() => handleTransaction(product.id)}>Transaction</button>
                  <button style={{ ...styles.btn, ...styles.pdf }} onClick={() => handleGeneratePdf(product.id)}>PDF</button>
                  <button style={{ ...styles.btn, ...styles.csv }} onClick={handleExportCsv}>CSV</button>
                  <button style={{ ...styles.btn, ...styles.report }} onClick={handleGlobalReport}>Rapport</button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const styles = {
  container: {
    padding: '30px',
    background: '#f0f4f8',
    minHeight: '100vh',
  },
  title: {
    textAlign: 'center',
    fontSize: '2rem',
    marginBottom: '20px',
    color: '#333',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    backgroundColor: '#fff',
    boxShadow: '0 0 15px rgba(0,0,0,0.1)',
  },
  th: {
    backgroundColor: '#1f6f8b',
    color: '#fff',
    padding: '12px',
    fontWeight: 'bold',
    borderBottom: '2px solid #ccc',
  },
  td: {
    padding: '10px',
    textAlign: 'center',
    borderBottom: '1px solid #eee',
  },
  tr: {
    transition: 'background-color 0.2s',
  },
  buttonGroup: {
    display: 'flex',
    gap: '6px',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  btn: {
    padding: '6px 10px',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '0.85rem',
    color: '#fff',
  },
  edit: { backgroundColor: '#3498db' },
  delete: { backgroundColor: '#e74c3c' },
  transaction: { backgroundColor: '#f39c12' },
  pdf: { backgroundColor: '#8e44ad' },
  csv: { backgroundColor: '#16a085' },
  report: { backgroundColor: '#2c3e50' },
};

export default ProductList;
