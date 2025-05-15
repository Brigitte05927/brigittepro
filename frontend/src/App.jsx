import React, { useState } from 'react';
// import { useContext } from 'react'; // Non nécessaire pour l'auth statique
import { useNavigate } from 'react-router-dom';
// import { AuthContext } from './services/AuthProvider'; // Commenté car inutilisé
// import { login } from './services/auth'; // Commenté car inutilisé

function App() {
  const navigate = useNavigate();
  // const { login: authLogin } = useContext(AuthContext); // Non utilisé ici

  const [showAdminLogin, setShowAdminLogin] = useState(false);
  const [credentials, setCredentials] = useState({
    username: '',
    password: '',
  });
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const toggleAdminLogin = () => {
    setShowAdminLogin(!showAdminLogin);
    setError(null); // Réinitialiser l'erreur
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCredentials(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      // Authentification statique
      if (
        credentials.username === 'admin' &&
        credentials.password === 'admin123'
      ) {
        // Redirection vers la liste des produits
        // authLogin({ username: 'admin' }); // Si tu veux utiliser le contexte plus tard
        navigate('/AddProduct');
      } else {
        throw new Error('Identifiants incorrects');
      }
    } catch (err) {
      setError(err.message || 'Erreur de connexion');
    } finally {
      setIsLoading(false);
    }
  };

  const paragraphs = [
    "Ce projet est une application de gestion d'inventaire conçue spécialement pour les petits commerces. De nombreux commerçants n'ont pas d'outil numérique fiable pour suivre leurs produits, leurs ventes et leurs niveaux de stock. Notre objectif est de résoudre ce problème avec une solution simple, accessible et efficace.",
    "L'application permet d'ajouter, modifier, supprimer des produits, suivre la quantité en stock, et recevoir des alertes lorsque le stock devient faible. Cela aide à éviter les ruptures de stock et à mieux organiser les réapprovisionnements.",
    "Nous avons aussi mis en place une interface d'administration sécurisée, accessible uniquement via une connexion. Cette interface permet d'exporter les données (au format CSV par exemple), d'avoir une vue d'ensemble sur les transactions, et de générer des rapports utiles pour l'analyse des ventes.",
    "Le projet est développé avec une architecture moderne : une application mobile en Java pour les utilisateurs, un backend Spring Boot pour la gestion des données, et un panneau d'administration en React. La base de données utilisée est MySQL, garantissant des performances fiables.",
    "Grâce à cette solution, les commerçants peuvent gagner du temps, réduire les erreurs de gestion, et améliorer leur efficacité au quotidien."
  ];

  return (
    <div className="app-container">
      <style>{`
        /* Styles CSS : inchangés */
        body {
          margin: 0;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          color: #333;
        }
        .app-container {
          min-height: 100vh;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          display: flex;
          flex-direction: column;
          background-attachment: fixed;
        }
        .app-header {
          background-color: rgba(0, 0, 0, 0.8);
          color: white;
          padding: 2.5rem 1.25rem;
          text-align: center;
          box-shadow: 0 4px 12px rgba(0,0,0,0.1);
        }
        .app-header h1 {
          margin: 0;
          font-size: 2.8em;
          font-weight: 600;
          letter-spacing: 0.5px;
        }
        .app-main {
          flex: 1;
          padding: 2.5rem 1.25rem;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .welcome-section {
          background-color: rgba(255, 255, 255, 0.97);
          padding: 2rem;
          border-radius: 1rem;
          max-width: 56.25rem;
          width: 100%;
          box-shadow: 0 8px 32px rgba(0,0,0,0.2);
          backdrop-filter: blur(4px);
        }
        .welcome-section p {
          font-size: 1.1em;
          line-height: 1.8;
          margin-bottom: 1.5rem;
          text-align: justify;
          color: #444;
        }
        .admin-btn {
          margin-top: 1.25rem;
          padding: 0.75rem 1.875rem;
          font-size: 1.1em;
          background-color: #2b6777;
          color: white;
          border: none;
          border-radius: 0.5rem;
          cursor: pointer;
          transition: all 0.3s ease;
          font-weight: 500;
        }
        .admin-btn:hover {
          background-color: #1e4d59;
          transform: translateY(-2px);
          box-shadow: 0 4px 8px rgba(0,0,0,0.1);
        }
        .login-modal {
          margin-top: 1.875rem;
          background-color: #f8f9fa;
          padding: 1.5rem;
          border-radius: 0.75rem;
          box-shadow: 0 4px 16px rgba(0,0,0,0.1);
          animation: fadeIn 0.3s ease-out;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .login-form h3 {
          margin-bottom: 1.25rem;
          color: #2b6777;
          text-align: center;
        }
        .form-group {
          margin-bottom: 1rem;
          text-align: left;
        }
        .form-group label {
          display: block;
          margin-bottom: 0.5rem;
          color: #495057;
          font-weight: 500;
        }
        .form-group input {
          width: 100%;
          padding: 0.625rem;
          border-radius: 0.5rem;
          border: 1px solid #ced4da;
          transition: border-color 0.3s;
          font-size: 1em;
        }
        .form-group input:focus {
          border-color: #2b6777;
          outline: none;
          box-shadow: 0 0 0 2px rgba(43, 103, 119, 0.2);
        }
        .form-actions {
          display: flex;
          justify-content: space-between;
          margin-top: 1.25rem;
          gap: 0.625rem;
        }
        .form-actions button {
          padding: 0.625rem 1.25rem;
          font-size: 1em;
          border: none;
          border-radius: 0.5rem;
          cursor: pointer;
          transition: all 0.3s;
          flex: 1;
        }
        .form-actions button:first-child {
          background-color: #6c757d;
          color: white;
        }
        .form-actions button:first-child:hover {
          background-color: #5a6268;
        }
        .form-actions button:last-child {
          background-color: #2b6777;
          color: white;
        }
        .form-actions button:last-child:hover {
          background-color: #1e4d59;
        }
        .form-actions button:disabled {
          background-color: #cccccc;
          cursor: not-allowed;
        }
        .error-message {
          color: #dc3545;
          margin-top: 1rem;
          text-align: center;
          font-weight: 500;
        }
        .app-footer {
          background-color: #222;
          color: white;
          text-align: center;
          padding: 1rem;
          font-size: 0.9em;
        }
        .loading-spinner {
          border: 3px solid rgba(255, 255, 255, 0.3);
          border-radius: 50%;
          border-top: 3px solid #2b6777;
          width: 20px;
          height: 20px;
          animation: spin 1s linear infinite;
          display: inline-block;
          vertical-align: middle;
          margin-left: 8px;
        }
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>

      <header className="app-header">
        <h1>Digital Inventory App for Small Shops</h1>
      </header>

      <main className="app-main">
        <section className="welcome-section">
          {paragraphs.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}

          <div className="admin-section">
            <button 
              className="admin-btn" 
              onClick={toggleAdminLogin}
              disabled={isLoading}
            >
              Admin Login
              {isLoading && <span className="loading-spinner"></span>}
            </button>

            {showAdminLogin && (
              <div className="login-modal">
                <form onSubmit={handleLogin} className="login-form">
                  <h3>Connexion Administrateur</h3>
                  <div className="form-group">
                    <label htmlFor="username">Nom d'utilisateur</label>
                    <input 
                      type="text" 
                      id="username" 
                      name="username"
                      value={credentials.username}
                      onChange={handleInputChange}
                      required 
                      disabled={isLoading}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="password">Mot de passe</label>
                    <input 
                      type="password" 
                      id="password" 
                      name="password"
                      value={credentials.password}
                      onChange={handleInputChange}
                      required 
                      disabled={isLoading}
                    />
                  </div>
                  {error && <div className="error-message">{error}</div>}
                  <div className="form-actions">
                    <button 
                      type="button" 
                      onClick={toggleAdminLogin}
                      disabled={isLoading}
                    >
                      Annuler
                    </button>
                    <button 
                      type="submit" 
                      disabled={isLoading}
                    >
                      {isLoading ? 'Connexion...' : 'Se connecter'}
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        </section>
      </main>

      <footer className="app-footer">
        <p>&copy; {new Date().getFullYear()} Digital Inventory Solution. Tous droits réservés.</p>
      </footer>
    </div>
  );
}

export default App;
