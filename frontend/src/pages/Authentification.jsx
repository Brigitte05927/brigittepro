import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Authentification = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (username === 'admin' && password === 'admin123') {
      alert('Connexion réussie !');
      navigate('/dashboard'); // ou une autre route après connexion
    } else {
      alert('Identifiants incorrects');
    }
  };

  const styles = {
    container: {
      height: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      background: 'linear-gradient(135deg, #6a11cb 0%, #2575fc 100%)',
      fontFamily: "'Segoe UI', sans-serif"
    },
    form: {
      background: 'white',
      padding: '40px',
      borderRadius: '20px',
      boxShadow: '0 15px 30px rgba(0, 0, 0, 0.2)',
      width: '100%',
      maxWidth: '400px'
    },
    title: {
      marginBottom: '30px',
      color: '#333',
      textAlign: 'center'
    },
    group: {
      marginBottom: '20px'
    },
    label: {
      display: 'block',
      fontWeight: 'bold',
      marginBottom: '8px'
    },
    input: {
      width: '100%',
      padding: '12px',
      border: '1px solid #ccc',
      borderRadius: '10px',
      fontSize: '1em'
    },
    button: {
      width: '100%',
      padding: '12px',
      backgroundColor: '#2575fc',
      color: 'white',
      border: 'none',
      borderRadius: '10px',
      fontSize: '1.1em',
      cursor: 'pointer',
      transition: 'background-color 0.3s ease'
    },
    buttonHover: {
      backgroundColor: '#1a5edb'
    }
  };

  return (
    <div style={styles.container}>
      <form style={styles.form} onSubmit={handleLogin}>
        <h2 style={styles.title}>Connexion Administrateur</h2>

        <div style={styles.group}>
          <label style={styles.label}>Nom d'utilisateur</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            style={styles.input}
          />
        </div>

        <div style={styles.group}>
          <label style={styles.label}>Mot de passe</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={styles.input}
          />
        </div>

        <button type="submit" style={styles.button}>Se connecter</button>
      </form>
    </div>
  );
};

export default Authentification;
