// services/products.js
import api from './api';

const productService = {
  // Récupérer tous les produits
  async getAllProducts() {
    try {
      return await api.get('/products');
    } catch (error) {
      console.error('Error fetching products:', error);
      throw error;
    }
  },

  // Récupérer un produit par son ID
  async getProductById(id) {
    try {
      return await api.get(`/products/${id}`);
    } catch (error) {
      console.error(`Error fetching product ${id}:`, error);
      throw error;
    }
  },

  // Créer un nouveau produit
  async createProduct(productData) {
    try {
      return await api.post('/products', productData);
    } catch (error) {
      console.error('Error creating product:', error);
      throw error;
    }
  },

  // Mettre à jour un produit
  async updateProduct(id, productData) {
    try {
      return await api.put(`/products/${id}`, productData);
    } catch (error) {
      console.error(`Error updating product ${id}:`, error);
      throw error;
    }
  },

  // Supprimer un produit
  async deleteProduct(id) {
    try {
      return await api.delete(`/products/${id}`);
    } catch (error) {
      console.error(`Error deleting product ${id}:`, error);
      throw error;
    }
  },

  // Récupérer les produits en stock faible
  async getLowStockProducts() {
    try {
      return await api.get('/products/low-stock');
    } catch (error) {
      console.error('Error fetching low stock products:', error);
      throw error;
    }
  },

  // Exporter les produits au format CSV
  exportProductsCSV() {
    // Redirection vers l'URL de téléchargement de CSV
    window.location.href = `${api.API_BASE_URL}/export/products`;
  }
};

export default productService;