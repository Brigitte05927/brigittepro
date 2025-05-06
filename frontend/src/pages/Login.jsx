import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

export default function Login() {
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    const username = e.target.username.value;
    const password = e.target.password.value;

    if (username === 'admin' && password === '1234') {
      navigate('/add-product');
    } else {
      setError('Identifiants incorrects');
    }
  };

  return (
    <>
      <style>{`
        body {
          margin: 0;
          font-family: Arial, sans-serif;
        }

        .login-container {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
          background: linear-gradient(to right top, #4158D0, #C850C0, #FFCC70);
        }

        .login-form {
          background-color: #ffffff;
          padding: 40px;
          border-radius: 15px;
          box-shadow: 0 0 15px rgba(0, 0, 0, 0.2);
          width: 300px;
        }

        .login-form h2 {
          text-align: center;
          margin-bottom: 20px;
          color: #2b6777;
        }

        .input-field {
          width: 100%;
          padding: 10px;
          margin: 10px 0;
          border-radius: 8px;
          border: 1px solid #ccc;
        }

        .submit-button {
          width: 100%;
          padding: 10px;
          border-radius: 8px;
          background-color: #2b6777;
          color: white;
          border: none;
          cursor: pointer;
          font-weight: bold;
        }

        .submit-button:hover {
          background-color: #1e4e5f;
        }

        .error-text {
          color: red;
          text-align: center;
          margin-top: 10px;
        }
      `}</style>

      <div className="login-container">
        <form onSubmit={handleLogin} className="login-form">
          <h2>Connexion Admin</h2>
          <input name="username" placeholder="Nom d'utilisateur" required className="input-field" />
          <input name="password" type="password" placeholder="Mot de passe" required className="input-field" />
          <button type="submit" className="submit-button">Se connecter</button>
          <p className="error-text">{error}</p>
        </form>
      </div>
    </>
  );
}
