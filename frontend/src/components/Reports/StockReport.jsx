import { useState, useEffect } from 'react';
import { apiRequest } from '../../services/api';
import { useAuth } from '../../services/auth';
import './StockReport.css';

function StockReport() {
  const [lowStockProducts, setLowStockProducts] = useState([]);
  const { token } = useAuth();

  useEffect(() => {
    fetchLowStockProducts();
  }, []);

  const fetchLowStockProducts = async () => {
    try {
      const data = await apiRequest('/reports/low-stock', 'GET', null, token);
      setLowStockProducts(data);
    } catch (error) {
      console.error('Error fetching low stock report:', error);
    }
  };

  const handleExportCSV = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/export/products', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'products_export.csv';
      document.body.appendChild(a);
      a.click();
      a.remove();
    } catch (error) {
      console.error('Error exporting CSV:', error);
    }
  };

  return (
    <div className="stock-report">
      <div className="report-header">
        <h3>Stock Report</h3>
        <button onClick={handleExportCSV} className="export-btn">
          Export to CSV
        </button>
      </div>

      <h4>Low Stock Products</h4>
      {lowStockProducts.length === 0 ? (
        <p>No products with low stock.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Product Name</th>
              <th>Current Quantity</th>
              <th>Minimum Quantity</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {lowStockProducts.map(product => (
              <tr key={product.id}>
                <td>{product.name}</td>
                <td className="low-quantity">{product.quantity}</td>
                <td>{product.minQuantity}</td>
                <td>${product.price.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default StockReport;