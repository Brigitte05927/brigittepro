import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import authService from './services/auth';

function App() {
  const navigate = useNavigate(); 
  const [showAdminLogin, setShowAdminLogin] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [erreur, setErreur] = useState(null);

  const toggleAdminLogin = () => {
    setShowAdminLogin(!showAdminLogin);
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    const login = await authService.login(username, password);

    if (!login) {
      alert('Identifiants incorrects');
    } else {
      navigate('/AddProduct');
    }
  };
  

  return (
    <div className="app-container">
      <style>{`
        body {
          margin: 0;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }

        .app-container {
          min-height: 100vh;
          background: linear-gradient(135deg, #667eea, #764ba2);
          display: flex;
          flex-direction: column;
        }

        .app-header {
          background-color: rgba(0, 0, 0, 0.7);
          color: white;
          padding: 40px 20px;
          text-align: center;
        }

        .app-header h1 {
          margin: 0;
          font-size: 2.8em;
        }

        .app-main {
          flex: 1;
          padding: 40px 20px;
          display: flex;
          justify-content: center;
        }

        .welcome-section {
          background-color: rgba(255, 255, 255, 0.95);
          padding: 30px;
          border-radius: 15px;
          max-width: 900px;
          width: 100%;
          box-shadow: 0 8px 16px rgba(0,0,0,0.2);
        }

        .welcome-section p {
          font-size: 1.2em;
          line-height: 1.8em;
          margin-bottom: 20px;
        }

        .admin-btn {
          margin-top: 20px;
          padding: 12px 30px;
          font-size: 1.1em;
          background-color: #2b6777;
          color: white;
          border: none;
          border-radius: 8px;
          cursor: pointer;
        }

        .admin-btn:hover {
          background-color: #1e4d59;
        }

        .login-modal {
          margin-top: 30px;
          background-color: #f5f5f5;
          padding: 20px;
          border-radius: 12px;
          box-shadow: 0 4px 10px rgba(0,0,0,0.1);
        }

        .login-form h3 {
          margin-bottom: 20px;
        }

        .form-group {
          margin-bottom: 15px;
          text-align: left;
        }

        .form-group label {
          display: block;
          margin-bottom: 5px;
        }

        .form-group input {
          width: 100%;
          padding: 10px;
          border-radius: 8px;
          border: 1px solid #ccc;
        }

        .form-actions {
          display: flex;
          justify-content: space-between;
          margin-top: 20px;
        }

        .form-actions button {
          padding: 10px 20px;
          font-size: 1em;
          border: none;
          border-radius: 8px;
          cursor: pointer;
        }

        .form-actions button:first-child {
          background-color: #ccc;
        }

        .form-actions button:last-child {
          background-color: #2b6777;
          color: white;
        }

        .form-actions button:last-child:hover {
          background-color: #1e4d59;
        }

        .app-footer {
          background-color: #222;
          color: white;
          text-align: center;
          padding: 15px;
        }
      `}</style>

      <header className="app-header">
        <h1>Digital Inventory App for Small Shops</h1>
      </header>

      <main className="app-main">
        <section className="welcome-section">
          <p>
            Ce projet est une application de gestion d’inventaire conçue spécialement pour les petits commerces.
            De nombreux commerçants n’ont pas d’outil numérique fiable pour suivre leurs produits, leurs ventes
            et leurs niveaux de stock. Notre objectif est de résoudre ce problème avec une solution simple, accessible et efficace.
          </p>
          <p>
            L’application permet d’ajouter, modifier, supprimer des produits, suivre la quantité en stock,
            et recevoir des alertes lorsque le stock devient faible. Cela aide à éviter les ruptures de stock
            et à mieux organiser les réapprovisionnements.
          </p>
          <p>
            Nous avons aussi mis en place une interface d’administration sécurisée, accessible uniquement via
            une connexion. Cette interface permet d’exporter les données (au format CSV par exemple), d’avoir
            une vue d’ensemble sur les transactions, et de générer des rapports utiles pour l’analyse des ventes.
          </p>
          <p>
            Le projet est développé avec une architecture moderne : une application mobile en Java pour les utilisateurs,
            un backend Spring Boot pour la gestion des données, et un panneau d’administration en React.
            La base de données utilisée est MySQL, garantissant des performances fiables.
          </p>
          <p>
            Grâce à cette solution, les commerçants peuvent gagner du temps, réduire les erreurs de gestion,
            et améliorer leur efficacité au quotidien.
          </p>

          <div className="admin-section">
            <button className="admin-btn" onClick={toggleAdminLogin}>Admin Login</button>

            {showAdminLogin && (
              <div className="login-modal">
                <form onSubmit={handleLogin} className="login-form">
                  <h3>Connexion Administrateur</h3>
                  <div className="form-group">
                    <label htmlFor="username">Nom d'utilisateur</label>
                    <input type="text" id="username" value={username} onChange={(e) => setUsername(e.target.value)} name="username" required />
                  </div>
                  <div className="form-group">
                    <label htmlFor="password">Mot de passe</label>
                    <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} name="password" required />
                  </div>
                  <div className="form-actions">
                    <button type="button" onClick={toggleAdminLogin}>Annuler</button>
                    <button type="submit">Se connecter</button>
                  </div>
                </form>
              </div>
            )}
          </div>
        </section>
      </main>

      <footer className="app-footer">
        <p>&copy; 2025 Digital Inventory Solution. Tous droits réservés.</p>
      </footer>
    </div>
  );
}

export default App;
