import './ProductList.css';

function ProductList({ products, onEdit, onDelete }) {
  return (
    <div className="product-list">
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Quantity</th>
            <th>Min Quantity</th>
            <th>Price</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>{product.name}</td>
              <td className={product.quantity < product.minQuantity ? 'low-stock' : ''}>
                {product.quantity}
              </td>
              <td>{product.minQuantity}</td>
              <td>${product.price.toFixed(2)}</td>
              <td className="actions">
                <button onClick={() => onEdit(product)} className="edit-btn">
                  Edit
                </button>
                <button onClick={() => onDelete(product.id)} className="delete-btn">
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ProductList;