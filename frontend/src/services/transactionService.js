// src/services/transactionService.js
import { getAuthHeader } from './auth';

const API_URL = 'http://localhost:8080/api';

export const fetchTransactions = async () => {
  const response = await fetch(`${API_URL}/transactions`, {
    headers: getAuthHeader(),
  });
  if (!response.ok) throw new Error('Erreur lors de la récupération des transactions');
  return await response.json();
};

export const createTransaction = async (transaction) => {
  const response = await fetch(`${API_URL}/transactions`, {
    method: 'POST',
    headers: getAuthHeader(),
    body: JSON.stringify(transaction),
  });
  if (!response.ok) throw new Error('Erreur lors de la création de la transaction');
  return await response.json();
};