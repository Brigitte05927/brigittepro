import React, { useEffect, useState } from 'react';
import axios from 'axios';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

const GlobalReport = () => {
  const [products, setProducts] = useState([]);
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    fetchProducts();
    fetchTransactions();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/products');
      setProducts(response.data);
    } catch (error) {
      console.error("Erreur lors du chargement des produits :", error);
    }
  };

  const fetchTransactions = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/transactions');
      setTransactions(response.data);
    } catch (error) {
      console.error("Erreur lors du chargement des transactions :", error);
    }
  };

  const lowStockProducts = products.filter(p => p.quantity < p.minQuantity);
  const totalStockValue = products.reduce((total, p) => total + (p.price * p.quantity), 0);

  const handleExportPDF = () => {
    const doc = new jsPDF();
    doc.text("Rapport Global - Inventaire", 14, 10);

    doc.text(`Total produits : ${products.length}`, 14, 20);
    doc.text(`Produits en stock faible : ${lowStockProducts.length}`, 14, 28);
    doc.text(`Transactions : ${transactions.length}`, 14, 36);
    doc.text(`Valeur totale du stock : ${totalStockValue.toFixed(2)} €`, 14, 44);

    autoTable(doc, {
      startY: 50,
      head: [['Produit', 'Quantité', 'Minimum']],
      body: lowStockProducts.map(p => [p.name, p.quantity, p.minQuantity]),
      theme: 'striped',
    });

    autoTable(doc, {
      startY: doc.lastAutoTable.finalY + 10,
      head: [['Date', 'Produit', 'Quantité', 'Type']],
      body: transactions.slice(0, 5).map(t => [
        new Date(t.date).toLocaleDateString(),
        t.productName,
        t.quantity,
        t.type,
      ]),
      theme: 'grid',
    });

    doc.save('rapport-global.pdf');
  };

  // Style CSS inline
  const styles = {
    page: {
      minHeight: '100vh',
      padding: '2rem',
      background: 'linear-gradient(135deg, #667eea, #764ba2, #e66465)',
      display: 'flex',
      justifyContent: 'center',
      fontFamily: "'Segoe UI', sans-serif",
    },
    container: {
      width: '100%',
      maxWidth: '1200px',
      backgroundColor: '#ffffffee',
      borderRadius: '24px',
      padding: '2rem 3rem',
      boxShadow: '0 20px 40px rgba(0,0,0,0.15)',
    },
    title: {
      fontSize: '2.5rem',
      fontWeight: 'bold',
      textAlign: 'center',
      marginBottom: '2rem',
      color: '#4c51bf',
    },
    statsGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
      gap: '1.5rem',
      marginBottom: '3rem',
    },
    statCard: {
      backgroundColor: '#fefefe',
      padding: '1.5rem',
      borderRadius: '20px',
      textAlign: 'center',
      boxShadow: '0 8px 16px rgba(0,0,0,0.1)',
    },
    statTitle: {
      fontSize: '1.1rem',
      fontWeight: '600',
      marginBottom: '0.5rem',
    },
    statNumber: (color) => ({
      fontSize: '2.2rem',
      fontWeight: '700',
      color,
    }),
    sectionTitle: {
      fontSize: '1.8rem',
      fontWeight: '700',
      marginBottom: '1rem',
      color: '#2d3748',
    },
    tableWrapper: {
      overflowX: 'auto',
      marginBottom: '2.5rem',
      borderRadius: '12px',
      boxShadow: '0 10px 20px rgba(0,0,0,0.1)',
    },
    table: {
      width: '100%',
      borderCollapse: 'collapse',
    },
    th: {
      backgroundColor: '#cbd5e0',
      padding: '12px',
      textAlign: 'left',
      fontWeight: '600',
    },
    td: {
      padding: '12px',
      borderBottom: '1px solid #e2e8f0',
      textAlign: 'left',
    },
    buttonContainer: {
      textAlign: 'center',
      marginTop: '2rem',
    },
    button: {
      backgroundColor: '#5a67d8',
      color: 'white',
      padding: '0.75rem 2rem',
      fontSize: '1rem',
      fontWeight: 'bold',
      border: 'none',
      borderRadius: '30px',
      cursor: 'pointer',
      boxShadow: '0 8px 15px rgba(90,103,216,0.3)',
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <h1 style={styles.title}>📊 Rapport Global - Inventaire</h1>

        <div style={styles.statsGrid}>
          <div style={styles.statCard}>
            <div style={styles.statTitle}>Produits</div>
            <div style={styles.statNumber('#3182ce')}>{products.length}</div>
          </div>
          <div style={styles.statCard}>
            <div style={styles.statTitle}>Transactions</div>
            <div style={styles.statNumber('#38a169')}>{transactions.length}</div>
          </div>
          <div style={styles.statCard}>
            <div style={styles.statTitle}>Stock Faible</div>
            <div style={styles.statNumber('#e53e3e')}>{lowStockProducts.length}</div>
          </div>
          <div style={styles.statCard}>
            <div style={styles.statTitle}>Valeur Stock (€)</div>
            <div style={styles.statNumber('#5a67d8')}>{totalStockValue.toFixed(2)}</div>
          </div>
        </div>

        <h2 style={styles.sectionTitle}>🛑 Produits en Stock Critique</h2>
        <div style={styles.tableWrapper}>
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>Nom</th>
                <th style={styles.th}>Quantité</th>
                <th style={styles.th}>Minimum</th>
              </tr>
            </thead>
            <tbody>
              {lowStockProducts.map(prod => (
                <tr key={prod.id}>
                  <td style={styles.td}>{prod.name}</td>
                  <td style={{ ...styles.td, color: 'red', fontWeight: 'bold' }}>{prod.quantity}</td>
                  <td style={styles.td}>{prod.minQuantity}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h2 style={styles.sectionTitle}>🔄 Dernières Transactions</h2>
        <div style={styles.tableWrapper}>
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>Date</th>
                <th style={styles.th}>Produit</th>
                <th style={styles.th}>Quantité</th>
                <th style={styles.th}>Type</th>
              </tr>
            </thead>
            <tbody>
              {transactions.slice(0, 5).map(tx => (
                <tr key={tx.id}>
                  <td style={styles.td}>{new Date(tx.date).toLocaleDateString()}</td>
                  <td style={styles.td}>{tx.productName}</td>
                  <td style={styles.td}>{tx.quantity}</td>
                  <td style={styles.td}>{tx.type}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div style={styles.buttonContainer}>
          <button style={styles.button} onClick={handleExportPDF}>
            📄 Télécharger le Rapport PDF
          </button>
        </div>
      </div>
    </div>
  );
};

export default GlobalReport;
