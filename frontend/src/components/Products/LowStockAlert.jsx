import { Link } from 'react-router-dom';
import './LowStockAlert.css';

function LowStockAlert({ products }) {
  const lowStockProducts = products.filter(p => p.quantity < p.minQuantity);

  if (lowStockProducts.length === 0) {
    return null;
  }

  return (
    <div className="low-stock-alert">
      <h4>⚠️ Low Stock Alert</h4>
      <ul>
        {lowStockProducts.map(product => (
          <li key={product.id}>
            <Link to={`/products`}>
              {product.name} - Only {product.quantity} left (min: {product.minQuantity})
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default LowStockAlert;