const API_URL = 'http://localhost:8088/api/login';

const login = async (username, password) => {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ username, password })
  });

  if (!response.ok) {
    throw new Error("Échec de l'authentification");
  }

  return response.json();
};

export default { login };
