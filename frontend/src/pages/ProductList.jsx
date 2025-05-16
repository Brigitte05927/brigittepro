import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    // Charger les produits
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/products');
                setProducts(response.data);
            } catch (err) {
                setError("Erreur de connexion au serveur. Vérifiez que le backend est en marche.");
                console.error("Erreur API:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, []);

    // Gestion des actions
    const handleDelete = async (id) => {
        if (!window.confirm("Êtes-vous sûr de vouloir supprimer ce produit ?")) return;
        
        try {
            await axios.delete(`http://localhost:8080/api/products/${id}`);
            setProducts(products.filter(p => p.id !== id));
        } catch (err) {
            setError("Échec de la suppression: " + (err.response?.data?.message || err.message));
        }
    };

    const handleEdit = (id) => navigate(`/edit-product/${id}`);
    const handleTransaction = (id) => navigate(`/transaction/${id}`);

    const handleGeneratePdf = async (id) => {
        try {
            const response = await axios.get(`http://localhost:8080/api/products/${id}/report`, {
                responseType: 'blob'
            });
            const blob = new Blob([response.data], { type: 'application/pdf' });
            const link = document.createElement('a');
            link.href = window.URL.createObjectURL(blob);
            link.download = `produit_${id}_rapport.pdf`;
            link.click();
        } catch (err) {
            setError("Erreur de génération du PDF: " + err.message);
        }
    };

    const handleExportCsv = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/products/export/csv');
            const blob = new Blob([response.data], { type: 'text/csv' });
            const link = document.createElement('a');
            link.href = window.URL.createObjectURL(blob);
            link.download = 'produits_export.csv';
            link.click();
        } catch (err) {
            setError("Erreur d'export CSV: " + err.message);
        }
    };

    const handleGlobalReport = () => navigate('/global-report');

    // Styles CSS intégrés
    const styles = `
        .product-list-container {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            max-width: 1200px;
            margin: 0 auto;
            padding: 20px;
        }
        
        .product-list-title {
            color: #2b6777;
            text-align: center;
            margin-bottom: 25px;
            font-size: 2rem;
        }
        
        .product-table {
            width: 100%;
            border-collapse: collapse;
            box-shadow: 0 2px 15px rgba(0, 0, 0, 0.1);
            overflow: hidden;
            border-radius: 8px;
        }
        
        .product-table th {
            background-color: #2b6777;
            color: white;
            padding: 15px;
            text-align: left;
        }
        
        .product-table td {
            padding: 12px 15px;
            border-bottom: 1px solid #e0e0e0;
        }
        
        .product-table tr:nth-child(even) {
            background-color: #f8f9fa;
        }
        
        .product-table tr:hover {
            background-color: #f1f1f1;
        }
        
        .action-buttons {
            display: flex;
            gap: 8px;
            flex-wrap: wrap;
        }
        
        .action-btn {
            border: none;
            padding: 8px 12px;
            border-radius: 4px;
            cursor: pointer;
            font-weight: 500;
            transition: all 0.3s ease;
            color: white;
            font-size: 0.85rem;
        }
        
        .edit-btn { background-color: #f39c12; }
        .delete-btn { background-color: #e74c3c; }
        .transaction-btn { background-color: #3498db; }
        .pdf-btn { background-color: #2b6777; }
        .csv-btn { background-color: #27ae60; }
        .report-btn { background-color: #9b59b6; }
        
        .action-btn:hover {
            opacity: 0.9;
            transform: translateY(-1px);
        }
        
        .loading-message {
            text-align: center;
            padding: 40px;
            font-size: 1.2rem;
            color: #555;
        }
        
        .error-message {
            background-color: #ffecec;
            color: #e74c3c;
            padding: 15px;
            border-radius: 5px;
            margin-bottom: 20px;
            border-left: 4px solid #e74c3c;
        }
        
        .refresh-btn {
            background-color: #2b6777;
            color: white;
            border: none;
            padding: 10px 15px;
            border-radius: 4px;
            cursor: pointer;
            margin-top: 10px;
        }
    `;

    if (loading) {
        return (
            <div className="product-list-container">
                <style>{styles}</style>
                <div className="loading-message">Chargement des produits en cours...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="product-list-container">
                <style>{styles}</style>
                <div className="error-message">
                    {error}
                    <button className="refresh-btn" onClick={() => window.location.reload()}>
                        Actualiser la page
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="product-list-container">
            <style>{styles}</style>
            
            <h1 className="product-list-title">Gestion des Produits</h1>
            
            <table className="product-table">
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
                    {products.map(product => (
                        <tr key={product.id}>
                            <td>{product.name}</td>
                            <td>{product.quantity}</td>
                            <td>{product.minQuantity}</td>
                            <td>{product.price.toFixed(2)}</td>
                            <td>
                                <div className="action-buttons">
                                    <button 
                                        className="action-btn edit-btn"
                                        onClick={() => handleEdit(product.id)}
                                    >
                                        Modifier
                                    </button>
                                    <button 
                                        className="action-btn delete-btn"
                                        onClick={() => handleDelete(product.id)}
                                    >
                                        Supprimer
                                    </button>
                                    <button 
                                        className="action-btn transaction-btn"
                                        onClick={() => handleTransaction(product.id)}
                                    >
                                        Transaction
                                    </button>
                                    <button 
                                        className="action-btn pdf-btn"
                                        onClick={() => handleGeneratePdf(product.id)}
                                    >
                                        PDF
                                    </button>
                                    <button 
                                        className="action-btn csv-btn"
                                        onClick={handleExportCsv}
                                    >
                                        CSV
                                    </button>
                                    <button 
                                        className="action-btn report-btn"
                                        onClick={handleGlobalReport}
                                    >
                                        Rapport
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

export default ProductList;