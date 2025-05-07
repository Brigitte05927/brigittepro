// services/transactions.js
import api from './api';

const transactionService = {
  // Récupérer toutes les transactions
  async getAllTransactions() {
    try {
      return await api.get('/transactions');
    } catch (error) {
      console.error('Error fetching transactions:', error);
      throw error;
    }
  },

  // Récupérer une transaction par son ID
  async getTransactionById(id) {
    try {
      return await api.get(`/transactions/${id}`);
    } catch (error) {
      console.error(`Error fetching transaction ${id}:`, error);
      throw error;
    }
  },

  // Créer une nouvelle transaction
  async createTransaction(transactionData) {
    try {
      return await api.post('/transactions', transactionData);
    } catch (error) {
      console.error('Error creating transaction:', error);
      throw error;
    }
  },

  // Ajouter du stock (transaction entrante)
  async addStock(productId, quantity) {
    const transaction = {
      productId,
      quantity,
      type: "IN"
    };
    return this.createTransaction(transaction);
  },

  // Retirer du stock (transaction sortante / vente)
  async removeStock(productId, quantity) {
    const transaction = {
      productId,
      quantity,
      type: "OUT"
    };
    return this.createTransaction(transaction);
  }
};

export default transactionService;