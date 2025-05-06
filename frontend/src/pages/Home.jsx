import { useNavigate } from 'react-router-dom';

export default function Home() {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate('/login');
  };

  return (
    <>
      <style>{`
        body {
          margin: 0;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          background-color: #f4f4f9;
          color: #333;
        }

        .home-container {
          min-height: 100vh;
          display: flex;
          justify-content: center;
          align-items: center;
          background: linear-gradient(to top right, #fbc2eb, #a6c1ee);
          padding: 0 20px;
        }

        .home-box {
          background-color: white;
          padding: 40px;
          border-radius: 20px;
          box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
          max-width: 800px;
          width: 100%;
          text-align: center;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        .home-box h1 {
          color: #2b6777;
          margin-bottom: 20px;
          font-size: 32px;
          font-weight: bold;
        }

        .home-box p {
          font-size: 18px;
          color: #444;
          line-height: 1.7;
          margin-bottom: 20px;
          text-align: justify;
        }

        .login-btn {
          padding: 14px 30px;
          background-color: #2b6777;
          color: white;
          border: none;
          border-radius: 8px;
          font-size: 18px;
          font-weight: bold;
          cursor: pointer;
          transition: background-color 0.3s ease, transform 0.2s ease-in-out;
          margin-top: 20px;
        }

        .login-btn:hover {
          background-color: #1e4e5f;
          transform: scale(1.05);
        }

        @media (max-width: 768px) {
          .home-box {
            padding: 30px;
          }

          .home-box h1 {
            font-size: 28px;
          }

          .home-box p {
            font-size: 16px;
          }

          .login-btn {
            font-size: 16px;
            padding: 12px 25px;
          }
        }

        @media (max-width: 480px) {
          .home-container {
            padding: 20px 0;
          }

          .home-box {
            padding: 25px;
          }

          .home-box h1 {
            font-size: 24px;
          }

          .home-box p {
            font-size: 14px;
          }

          .login-btn {
            font-size: 14px;
            padding: 10px 20px;
          }
        }
      `}</style>

      <div className="home-container">
        <div className="home-box">
          <h1>Digital Inventory App for Small Shops</h1>
          <p>
            Bienvenue dans votre solution numérique de gestion de stock, pensée spécialement pour les petits commerces.
            Gagnez du temps et simplifiez votre quotidien grâce à des fonctionnalités pratiques telles que le suivi en temps réel
            des quantités, les alertes de réapprovisionnement, l’ajout ou la suppression de produits, ainsi que l’exportation des données.
            Un espace administrateur sécurisé vous permet de gérer facilement votre inventaire.
          </p>
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
          <button className="login-btn" onClick={handleLoginClick}>
            Espace Admin
          </button>
        </div>
      </div>
    </>
  );
}
