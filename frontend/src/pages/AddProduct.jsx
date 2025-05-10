import { useNavigate } from 'react-router-dom';

export default function AddProduct() {
  const navigate = useNavigate();

  const handleAdd = (e) => {
    e.preventDefault();
    // Simuler l’ajout
    navigate('/productList');
  };

  return (
    <>
      <style>{`
        body {
          margin: 0;
          font-family: Arial, sans-serif;
        }

        .add-product-container {
          min-height: 100vh;
          background: linear-gradient(to top left, #e0c3fc, #8ec5fc);
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .form-box {
          background-color: #fff;
          padding: 40px;
          border-radius: 20px;
          box-shadow: 0 10px 20px rgba(0,0,0,0.3);
          width: 400px;
        }

        .form-box h2 {
          text-align: center;
          color: #2b6777;
          margin-bottom: 20px;
        }

        .input-field {
          width: 100%;
          padding: 12px;
          margin-bottom: 15px;
          border-radius: 8px;
          border: 1px solid #ccc;
        }

        .submit-button {
          width: 100%;
          padding: 12px;
          border-radius: 8px;
          background-color: #2b6777;
          color: white;
          border: none;
          font-weight: bold;
          cursor: pointer;
        }

        .submit-button:hover {
          background-color: #1e4e5f;
        }
      `}</style>

      <div className="add-product-container">
        <form onSubmit={handleAdd} className="form-box">
          <h2>Ajouter un produit</h2>
          <input name="name" placeholder="Nom du produit" required className="input-field" />
          <input name="quantity" type="number" placeholder="Quantité" required className="input-field" />
          <input name="minQuantity" type="number" placeholder="Stock minimum" required className="input-field" />
          <input name="price" type="number" step="0.01" placeholder="Prix (€)" required className="input-field" />
          <button type="submit" className="submit-button">Ajouter</button>
        </form>
      </div>
    </>
  );
}
