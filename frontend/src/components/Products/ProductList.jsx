import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaEdit, FaTrash, FaFilePdf, FaFileCsv, FaExchangeAlt, FaChartBar, FaSave, FaTimes } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import jsPDF from 'jspdf';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null); // Produit en cours d'édition
  const [formData, setFormData] = useState({ name: '', quantity: 0, minQuantity: 0, price: 0 });
  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/products');
      setProducts(response.data);
    } catch (error) {
      console.error("Erreur lors du chargement des produits :", error);
    }
  };

  // Ouvrir le formulaire d'édition avec les données du produit
  const handleEdit = (product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name || '',
      quantity: product.quantity || 0,
      minQuantity: product.minQuantity || 0,
      price: product.price || 0,
    });
  };

  // Fermer le formulaire d'édition
  const handleCancelEdit = () => {
    setEditingProduct(null);
  };

  // Mise à jour du formulaire
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'name' ? value : Number(value), // name reste string, les autres en number
    }));
  };

  // Sauvegarder les modifications (PUT)
  const handleSave = async () => {
    try {
      await axios.put(`http://localhost:8080/api/products/${editingProduct.id}`, formData);
      alert('Produit mis à jour !');
      setEditingProduct(null);
      fetchProducts();
    } catch (error) {
      alert('Erreur lors de la mise à jour');
      console.error(error);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Voulez-vous vraiment supprimer ce produit ?")) return;
    try {
      await axios.delete(`http://localhost:8080/api/products/${id}`);
      alert("Produit supprimé !");
      fetchProducts();
    } catch (error) {
      alert("Erreur lors de la suppression");
    }
  };

  const handleTransaction = (id) => {
    alert(`Transaction pour produit ID : ${id} (fonction à implémenter)`);
  };

  const handleGeneratePdf = (product) => {
    const doc = new jsPDF();
    doc.text(`Rapport produit : ${product.name}`, 10, 10);
    doc.text(`Quantité : ${product.quantity}`, 10, 20);
    doc.text(`Stock min : ${product.minQuantity}`, 10, 30);
    doc.text(`Prix : ${product.price.toFixed(2)} €`, 10, 40);
    doc.save(`${product.name}_rapport.pdf`);
  };

  const handleExportCsv = () => {
    if (!products.length) {
      alert("Aucun produit à exporter");
      return;
    }
    const csvHeader = 'ID,Nom,Quantité,Stock Min,Prix\n';
    const csvRows = products.map(p => `${p.id},"${p.name}",${p.quantity},${p.minQuantity},${p.price.toFixed(2)}`);
    const csvContent = csvHeader + csvRows.join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'produits.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleGlobalReport = () => {
    navigate('/report');
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Liste des Produits</h1>

      {editingProduct && (
        <div style={styles.modal}>
          <h2>Modifier le produit : {editingProduct.name}</h2>
          <div style={styles.formGroup}>
            <label>Nom :</label>
            <input type="text" name="name" value={formData.name} onChange={handleChange} />
          </div>
          <div style={styles.formGroup}>
            <label>Quantité :</label>
            <input type="number" name="quantity" value={formData.quantity} onChange={handleChange} min={0} />
          </div>
          <div style={styles.formGroup}>
            <label>Stock Min :</label>
            <input type="number" name="minQuantity" value={formData.minQuantity} onChange={handleChange} min={0} />
          </div>
          <div style={styles.formGroup}>
            <label>Prix (€) :</label>
            <input type="number" name="price" step="0.01" value={formData.price} onChange={handleChange} min={0} />
          </div>
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
            <button style={{ ...styles.btn, ...styles.save }} onClick={handleSave} title="Enregistrer">
              <FaSave /> Enregistrer
            </button>
            <button style={{ ...styles.btn, ...styles.cancel }} onClick={handleCancelEdit} title="Annuler">
              <FaTimes /> Annuler
            </button>
          </div>
        </div>
      )}

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
          {products.length === 0 && (
            <tr>
              <td colSpan="5" style={{ textAlign: 'center', padding: 20 }}>Aucun produit trouvé.</td>
            </tr>
          )}
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
                  <button style={{ ...styles.btn, ...styles.edit }} onClick={() => handleEdit(product)} title="Modifier">
                    <FaEdit />
                  </button>
                  <button style={{ ...styles.btn, ...styles.delete }} onClick={() => handleDelete(product.id)} title="Supprimer">
                    <FaTrash />
                  </button>
                  <button style={{ ...styles.btn, ...styles.transaction }} onClick={() => handleTransaction(product.id)} title="Transaction">
                    <FaExchangeAlt />
                  </button>
                  <button style={{ ...styles.btn, ...styles.pdf }} onClick={() => handleGeneratePdf(product)} title="Générer PDF">
                    <FaFilePdf />
                  </button>
                  <button style={{ ...styles.btn, ...styles.csv }} onClick={handleExportCsv} title="Exporter CSV">
                    <FaFileCsv />
                  </button>
                  <button style={{ ...styles.btn, ...styles.report }} onClick={handleGlobalReport} title="Voir rapport global">
                    <FaChartBar />
                  </button>
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
    fontSize: '1rem',
    color: '#fff',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '6px',
  },
  edit: { backgroundColor: '#3498db' },
  delete: { backgroundColor: '#e74c3c' },
  transaction: { backgroundColor: '#f39c12' },
  pdf: { backgroundColor: '#8e44ad' },
  csv: { backgroundColor: '#16a085' },
  report: { backgroundColor: '#2c3e50' },
  modal: {
    backgroundColor: '#fff',
    padding: '20px',
    marginBottom: '30px',
    boxShadow: '0 0 20px rgba(0,0,0,0.2)',
    borderRadius: '8px',
    maxWidth: '600px',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  formGroup: {
    marginBottom: '15px',
    display: 'flex',
    flexDirection: 'column',
    textAlign: 'left',
  },
  save: {
    backgroundColor: '#27ae60',
  },
  cancel: {
    backgroundColor: '#c0392b',
  },
};

export default ProductList;
