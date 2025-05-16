import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FaEdit, FaTrash, FaExchangeAlt, FaFilePdf, FaFileCsv, FaChartBar } from 'react-icons/fa';

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

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

    const styles = `
        body {
            margin: 0;
            font-family: 'Segoe UI', sans-serif;
            background: linear-gradient(135deg, #e0f7fa, #ffffff);
        }

        .product-list-container {
            max-width: 1200px;
            margin: 40px auto;
            padding: 20px;
            background: white;
            border-radius: 16px;
            box-shadow: 0 10px 25px rgba(0,0,0,0.1);
        }

        .product-list-title {
            text-align: center;
            color: #2b6777;
            margin-bottom: 30px;
            font-size: 2.2rem;
        }

        .product-table {
            width: 100%;
            border-collapse: collapse;
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
            background-color: #f4f8f9;
        }

        .product-table tr:hover {
            background-color: #f0f0f0;
        }

        .action-buttons {
            display: flex;
            flex-wrap: wrap;
            gap: 6px;
        }

        .action-btn {
            display: flex;
            align-items: center;
            gap: 6px;
            border: none;
            padding: 6px 10px;
            border-radius: 8px;
            cursor: pointer;
            font-size: 0.85rem;
            font-weight: bold;
            color: white;
            transition: all 0.3s ease;
        }

        .edit-btn { background-color: #f39c12; }
        .delete-btn { background-color: #e74c3c; }
        .transaction-btn { background-color: #3498db; }
        .pdf-btn { background-color: #2b6777; }
        .csv-btn { background-color: #27ae60; }
        .report-btn { background-color: #9b59b6; }

        .action-btn:hover {
            opacity: 0.9;
        }

        .loading-message,
        .error-message {
            text-align: center;
            font-size: 1.1rem;
            padding: 20px;
        }

        .error-message {
            color: #e74c3c;
            background-color: #ffecec;
            border-left: 4px solid #e74c3c;
            margin-bottom: 20px;
        }

        .refresh-btn {
            margin-top: 10px;
            padding: 10px 15px;
            background-color: #2b6777;
            color: white;
            border: none;
            border-radius: 8px;
            cursor: pointer;
        }
    `;

    if (loading) {
        return (
            <div className="product-list-container">
                <style>{styles}</style>
                <div className="loading-message">Chargement des produits...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="product-list-container">
                <style>{styles}</style>
                <div className="error-message">
                    {error}
                    <br />
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
                                    <button className="action-btn edit-btn" onClick={() => handleEdit(product.id)}>
                                        <FaEdit /> Modifier
                                    </button>
                                    <button className="action-btn delete-btn" onClick={() => handleDelete(product.id)}>
                                        <FaTrash /> Supprimer
                                    </button>
                                    <button className="action-btn transaction-btn" onClick={() => handleTransaction(product.id)}>
                                        <FaExchangeAlt /> Transaction
                                    </button>
                                    <button className="action-btn pdf-btn" onClick={() => handleGeneratePdf(product.id)}>
                                        <FaFilePdf /> PDF
                                    </button>
                                    <button className="action-btn csv-btn" onClick={handleExportCsv}>
                                        <FaFileCsv /> CSV
                                    </button>
                                    <button className="action-btn report-btn" onClick={handleGlobalReport}>
                                        <FaChartBar /> Rapport
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
