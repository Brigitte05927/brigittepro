import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom'; // <-- Ajoutez cette ligne
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter> {/* <-- Enveloppez votre App avec BrowserRouter */}
      <App />
    </BrowserRouter>
  </React.StrictMode>
);