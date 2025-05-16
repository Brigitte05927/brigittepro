import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const EditProduct = () => {
    const { id } = useParams(); // récupère l'id du produit dans l'URL
    const navigate = useNavigate();

    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/products/${id}`);
                setProduct(response.data);
            } catch (err) {
                setError("Produit introuvable.");
            } finally {
                setLoading(false);
            }
        };
        fetchProduct();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProduct(prev => ({ ...prev, [name]: name === 'price' || name === 'quantity' || name === 'minQuantity' ? Number(value) : value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSaving(true);
        try {
            await axios.put(`http://localhost:8080/api/products/${id}`, product);
            alert('Produit modifié avec succès !');
            navigate('/'); // redirige vers la liste des produits
        } catch (err) {
            alert("Erreur lors de la modification : " + (err.response?.data?.message || err.message));
        } finally {
            setSaving(false);
        }
    };

    if (loading) return <div style={{ padding: 20, textAlign: 'center' }}>Chargement du produit...</div>;
    if (error) return <div style={{ padding: 20, color: 'red', textAlign: 'center' }}>{error}</div>;
    if (!product) return null;

    return (
        <div style={{ maxWidth: 600, margin: '40px auto', padding: 20, background: 'white', borderRadius: 16, boxShadow: '0 10px 25px rgba(0,0,0,0.1)' }}>
            <h2 style={{ color: '#2b6777', marginBottom: 20 }}>Modifier le produit</h2>
            <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: 15 }}>
                    <label>Nom :</label><br />
                    <input type="text" name="name" value={product.name} onChange={handleChange} required style={{ width: '100%', padding: 8, borderRadius: 6, border: '1px solid #ccc' }} />
                </div>
                <div style={{ marginBottom: 15 }}>
                    <label>Quantité :</label><br />
                    <input type="number" name="quantity" value={product.quantity} onChange={handleChange} required min="0" style={{ width: '100%', padding: 8, borderRadius: 6, border: '1px solid #ccc' }} />
                </div>
                <div style={{ marginBottom: 15 }}>
                    <label>Stock minimum :</label><br />
                    <input type="number" name="minQuantity" value={product.minQuantity} onChange={handleChange} required min="0" style={{ width: '100%', padding: 8, borderRadius: 6, border: '1px solid #ccc' }} />
                </div>
                <div style={{ marginBottom: 15 }}>
                    <label>Prix (€) :</label><br />
                    <input type="number" name="price" value={product.price} onChange={handleChange} required min="0" step="0.01" style={{ width: '100%', padding: 8, borderRadius: 6, border: '1px solid #ccc' }} />
                </div>
                <button type="submit" disabled={saving} style={{ backgroundColor: '#f39c12', color: 'white', border: 'none', padding: '10px 20px', borderRadius: 8, cursor: saving ? 'not-allowed' : 'pointer' }}>
                    {saving ? 'Sauvegarde...' : 'Enregistrer'}
                </button>
                <button type="button" onClick={() => navigate('/')} style={{ marginLeft: 10, padding: '10px 20px', borderRadius: 8, cursor: 'pointer' }}>
                    Annuler
                </button>
            </form>
        </div>
    );
};

export default EditProduct;
