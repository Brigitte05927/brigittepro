import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState({
    name: '',
    quantity: '',
    minQuantity: '',
    price: '',
  });

  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`http://localhost:8080/api/products/${id}`);
        setProduct(res.data);
      } catch (err) {
        setError("Erreur lors du chargement du produit.");
      }
    };
    fetchProduct();
  }, [id]);

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8080/api/products/${id}`, product);
      alert("Produit mis à jour avec succès !");
      navigate('/ProductList'); // 🔁 Redirection vers la page liste des produits
    } catch (err) {
      setError("Erreur lors de la mise à jour.");
    }
  };

  const styles = `
    body {
      margin: 0;
      font-family: 'Segoe UI', sans-serif;
      background: linear-gradient(to right, #d3f4ff, #ffffff);
    }

    .edit-container {
      max-width: 500px;
      margin: 60px auto;
      background-color: #ffffff;
      padding: 30px;
      border-radius: 16px;
      box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
    }

    .edit-title {
      font-size: 1.8rem;
      color: #2b6777;
      text-align: center;
      margin-bottom: 25px;
    }

    .form-group {
      margin-bottom: 15px;
    }

    .form-label {
      display: block;
      margin-bottom: 6px;
      font-weight: 600;
      color: #333;
    }

    .form-input {
      width: 100%;
      padding: 10px 12px;
      border: 1px solid #ccc;
      border-radius: 8px;
      font-size: 1rem;
      transition: border 0.3s ease;
    }

    .form-input:focus {
      border-color: #2b6777;
      outline: none;
    }

    .submit-btn {
      width: 100%;
      padding: 12px;
      background-color: #2b6777;
      color: white;
      font-size: 1rem;
      font-weight: bold;
      border: none;
      border-radius: 10px;
      cursor: pointer;
      transition: background-color 0.3s ease;
    }

    .submit-btn:hover {
      background-color: #1d4f5f;
    }

    .error-message {
      color: #e74c3c;
      background-color: #ffecec;
      border-left: 4px solid #e74c3c;
      padding: 12px;
      margin-bottom: 20px;
      border-radius: 8px;
    }
  `;

  return (
    <div className="edit-container">
      <style>{styles}</style>
      <h2 className="edit-title">Modifier le Produit</h2>
      {error && <div className="error-message">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label">Nom du produit</label>
          <input
            type="text"
            name="name"
            value={product.name}
            onChange={handleChange}
            className="form-input"
            required
          />
        </div>
        <div className="form-group">
          <label className="form-label">Quantité</label>
          <input
            type="number"
            name="quantity"
            value={product.quantity}
            onChange={handleChange}
            className="form-input"
            required
          />
        </div>
        <div className="form-group">
          <label className="form-label">Stock minimum</label>
          <input
            type="number"
            name="minQuantity"
            value={product.minQuantity}
            onChange={handleChange}
            className="form-input"
            required
          />
        </div>
        <div className="form-group">
          <label className="form-label">Prix (€)</label>
          <input
            type="number"
            name="price"
            step="0.01"
            value={product.price}
            onChange={handleChange}
            className="form-input"
            required
          />
        </div>
        <button type="submit" className="submit-btn">Enregistrer</button>
      </form>
    </div>
  );
};

export default EditProduct;
