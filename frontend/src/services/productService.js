// src/services/productService.js
import { getAuthHeader } from './auth';

const API_URL = 'http://localhost:8080/api';

export const fetchProducts = async () => {
  const response = await fetch(`${API_URL}/products`, {
    headers: getAuthHeader(),
  });
  if (!response.ok) throw new Error('Erreur lors de la récupération des produits');
  return await response.json();
};

export const createProduct = async (product) => {
  const response = await fetch(`${API_URL}/products`, {
    method: 'POST',
    headers: getAuthHeader(),
    body: JSON.stringify(product),
  });
  if (!response.ok) throw new Error('Erreur lors de la création du produit');
  return await response.json();
};

export const updateProduct = async (id, product) => {
  const response = await fetch(`${API_URL}/products/${id}`, {
    method: 'PUT',
    headers: getAuthHeader(),
    body: JSON.stringify(product),
  });
  if (!response.ok) throw new Error('Erreur lors de la mise à jour du produit');
  return await response.json();
};

export const deleteProduct = async (id) => {
  const response = await fetch(`${API_URL}/products/${id}`, {
    method: 'DELETE',
    headers: getAuthHeader(),
  });
  if (!response.ok) throw new Error('Erreur lors de la suppression du produit');
};