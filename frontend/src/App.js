import logo from './logo.svg';
import './App.css';
import React from "react";

function App() {
  const handleExport = () => {
    // Ouvre le lien de téléchargement
    window.location.href = "http://localhost:8080/api/export/csv";
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>

      {/* Section ajoutée pour l'exportation CSV */}
      <div style={{ padding: 40 }}>
        <h1>Admin - Sauvegarde & Exportation</h1>
        <button onClick={handleExport}>
          📤 Exporter Produits (CSV)
        </button>
      </div>
    </div>
  );
}

export default App;
