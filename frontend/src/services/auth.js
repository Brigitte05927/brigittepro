const API_URL = 'http://localhost:8080/api';

const login = async (username, password) => {
  try {
    const response = await fetch(`${API_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username, password })
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || 'Erreur inconnue');
    }

    // Enregistrer le token dans le localStorage
    localStorage.setItem('token', data.token);
    return data;
  } catch (error) {
    console.error('Erreur de connexion :', error);
    return null;
  }
};

export default { login };
