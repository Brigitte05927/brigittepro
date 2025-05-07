import { useState, useEffect } from 'react';
import ProductList from '../components/Products/ProductList';
import ProductForm from '../components/Products/ProductForm';
import LowStockAlert from '../components/Products/LowStockAlert';
import { apiRequest } from '../services/api';
import { useAuth } from '../services/auth';
import './ProductsPage.css';

function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const { token } = useAuth();

  useEffect(() => {
    fetchProducts();
  }, [token]);

  const fetchProducts = async () => {
    try {
      const data = await apiRequest('/products', 'GET', null, token);
      setProducts(data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const handleSave = async (product) => {
    try {
      if (editingProduct) {
        await apiRequest(`/products/${product.id}`, 'PUT', product, token);
      } else {
        await apiRequest('/products', 'POST', product, token);
      }
      fetchProducts();
      setShowForm(false);
      setEditingProduct(null);
    } catch (error) {
      console.error('Error saving product:', error);
    }
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    try {
      await apiRequest(`/products/${id}`, 'DELETE', null, token);
      fetchProducts();
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  return (
    <div className="products-page">
      <div className="page-header">
        <h2>Products Management</h2>
        <button onClick={() => setShowForm(true)} className="add-btn">
          Add Product
        </button>
      </div>

      <LowStockAlert products={products} />

      {showForm && (
        <ProductForm
          product={editingProduct}
          onSave={handleSave}
          onCancel={() => {
            setShowForm(false);
            setEditingProduct(null);
          }}
        />
      )}

      <ProductList
        products={products}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
}

export default ProductsPage;