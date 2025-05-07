import { useState, useEffect } from 'react';
import { apiRequest } from '../../services/api';
import { useAuth } from '../../services/auth';
import './SalesReport.css';

function SalesReport() {
  const [sales, setSales] = useState([]);
  const [dateRange, setDateRange] = useState({
    from: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    to: new Date().toISOString().split('T')[0]
  });
  const { token } = useAuth();

  useEffect(() => {
    fetchSales();
  }, []);

  const fetchSales = async () => {
    try {
      const data = await apiRequest(
        `/reports/sales?from=${dateRange.from}T00:00:00&to=${dateRange.to}T23:59:59`,
        'GET',
        null,
        token
      );
      setSales(data);
    } catch (error) {
      console.error('Error fetching sales report:', error);
    }
  };

  const handleDateChange = (e) => {
    setDateRange({
      ...dateRange,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchSales();
  };

  return (
    <div className="sales-report">
      <h3>Sales Report</h3>
      
      <form onSubmit={handleSubmit} className="date-range-form">
        <div className="form-group">
          <label>From:</label>
          <input
            type="date"
            name="from"
            value={dateRange.from}
            onChange={handleDateChange}
          />
        </div>
        
        <div className="form-group">
          <label>To:</label>
          <input
            type="date"
            name="to"
            value={dateRange.to}
            onChange={handleDateChange}
          />
        </div>
        
        <button type="submit" className="update-btn">
          Update Report
        </button>
      </form>

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Product ID</th>
            <th>Quantity</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {sales.map(sale => (
            <tr key={sale.id}>
              <td>{sale.id}</td>
              <td>{sale.productId}</td>
              <td>{sale.quantity}</td>
              <td>{new Date(sale.date).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default SalesReport;