import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Routes>
      <Route path="/" element={<h1>Page d'accueil</h1>} />
      <Route path="/about" element={<h1>À propos</h1>} />
    </Routes>
  );
}

export default App;