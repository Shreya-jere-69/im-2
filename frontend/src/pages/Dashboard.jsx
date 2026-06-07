import { useEffect, useState } from "react";
import axios from "axios";

function Dashboard() {
  const [summary, setSummary] = useState({
    totalProducts: 0,
    totalSuppliers: 0,
    totalSales: 0,
    totalPurchases: 0,
    lowStockProducts: 0,
    outOfStockProducts: 0,
    totalSalesAmount: 0,
    totalPurchaseAmount: 0
  });

  const [lowStockProducts, setLowStockProducts] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/dashboard/summary")
      .then((res) => {
        setSummary(res.data);
      })
      .catch((err) => {
        console.log(err);
      });

    axios
      .get("http://localhost:5000/api/dashboard/low-stock")
      .then((res) => {
        setLowStockProducts(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      <div className="header">
        <h1>Dashboard</h1>
        <p>Inventory overview and reports</p>
      </div>

      <div className="cards">
        <div className="card">
          <h3>Total Products</h3>
          <p>{summary.totalProducts}</p>
        </div>

        <div className="card">
          <h3>Total Suppliers</h3>
          <p>{summary.totalSuppliers}</p>
        </div>

        <div className="card">
          <h3>Total Sales</h3>
          <p>{summary.totalSales}</p>
        </div>

        <div className="card">
          <h3>Total Purchases</h3>
          <p>{summary.totalPurchases}</p>
        </div>

        <div className="card">
          <h3>Low Stock</h3>
          <p>{summary.lowStockProducts}</p>
        </div>

        <div className="card">
          <h3>Out of Stock</h3>
          <p>{summary.outOfStockProducts}</p>
        </div>

        <div className="card">
          <h3>Sales Amount</h3>
          <p>Rs. {summary.totalSalesAmount}</p>
        </div>

        <div className="card">
          <h3>Purchase Amount</h3>
          <p>Rs. {summary.totalPurchaseAmount}</p>
        </div>
      </div>

      <div className="table-box">
        <h2>Low Stock Products</h2>

        <table className="product-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Category</th>
              <th>Quantity</th>
              <th>Supplier</th>
            </tr>
          </thead>

          <tbody>
            {lowStockProducts.map((product) => (
              <tr key={product._id}>
                <td>{product.name}</td>
                <td>{product.category}</td>
                <td>{product.quantity}</td>
                <td>{product.supplier}</td>
              </tr>
            ))}

            {lowStockProducts.length === 0 && (
              <tr>
                <td colSpan="4" className="empty-text">
                  No low stock products
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default Dashboard;