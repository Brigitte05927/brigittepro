export default function ProductList() {
  return (
    <>
      <style>{`
        body {
          margin: 0;
          font-family: Arial, sans-serif;
        }

        .product-container {
          min-height: 100vh;
          background: linear-gradient(to left top, #d9afd9, #97d9e1);
          padding: 50px;
        }

        .product-box {
          background-color: #fff;
          padding: 30px;
          border-radius: 20px;
          box-shadow: 0 8px 16px rgba(0,0,0,0.2);
          max-width: 1000px;
          margin: auto;
        }

        .product-box h2 {
          text-align: center;
          margin-bottom: 30px;
          color: #2b6777;
        }

        table {
          width: 100%;
          border-collapse: collapse;
        }

        th, td {
          padding: 12px;
          text-align: left;
          border-bottom: 1px solid #ddd;
        }

        thead tr {
          background-color: #2b6777;
          color: white;
        }

        .btn {
          margin-right: 5px;
          padding: 8px 12px;
          border: none;
          border-radius: 6px;
          cursor: pointer;
          font-weight: bold;
        }

        .btn-edit {
          background-color: #ffb347;
          color: white;
        }

        .btn-delete {
          background-color: #e74c3c;
          color: white;
        }

        .btn-export {
          background-color: #3498db;
          color: white;
        }

        .btn-transact {
          background-color: #2ecc71;
          color: white;
        }

        .btn:hover {
          opacity: 0.85;
        }
      `}</style>

      <div className="product-container">
        <div className="product-box">
          <h2>Liste des produits</h2>
          <table>
            <thead>
              <tr>
                <th>Nom</th>
                <th>Quantité</th>
                <th>Min</th>
                <th>Prix</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Savon</td>
                <td>45</td>
                <td>10</td>
                <td>2.50€</td>
                <td>
                  <button className="btn btn-edit">Modifier</button>
                  <button className="btn btn-delete">Supprimer</button>
                  <button className="btn btn-export">Exporter</button>
                  <button className="btn btn-transact">Transaction</button>
                </td>
              </tr>
              {/* Tu peux ajouter d'autres lignes ici */}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
