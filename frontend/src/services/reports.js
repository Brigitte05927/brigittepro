// services/reports.js
import api from './api';

const reportService = {
  // Récupérer les produits en stock faible
  async getLowStockReport() {
    try {
      return await api.get('/reports/low-stock');
    } catch (error) {
      console.error('Error fetching low stock report:', error);
      throw error;
    }
  },

  // Récupérer le rapport des ventes entre deux dates
  async getSalesReport(fromDate, toDate) {
    try {
      return await api.get(`/reports/sales?from=${fromDate}&to=${toDate}`);
    } catch (error) {
      console.error('Error fetching sales report:', error);
      throw error;
    }
  },

  // Fonction pour formater une date au format ISO pour les requêtes
  formatDateForQuery(date) {
    return date.toISOString(); // format: 2024-05-07T12:00:00.000Z
  }
};

export default reportService;