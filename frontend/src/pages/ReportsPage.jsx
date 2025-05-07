import { useState } from 'react';
import SalesReport from '../components/Reports/SalesReport';
import StockReport from '../components/Reports/StockReport';
import './ReportsPage.css';

function ReportsPage() {
  const [activeTab, setActiveTab] = useState('stock');

  return (
    <div className="reports-page">
      <h2>Reports</h2>
      
      <div className="tabs">
        <button
          onClick={() => setActiveTab('stock')}
          className={activeTab === 'stock' ? 'active' : ''}
        >
          Stock Report
        </button>
        <button
          onClick={() => setActiveTab('sales')}
          className={activeTab === 'sales' ? 'active' : ''}
        >
          Sales Report
        </button>
      </div>
      
      <div className="tab-content">
        {activeTab === 'stock' ? <StockReport /> : <SalesReport />}
      </div>
    </div>
  );
}

export default ReportsPage;