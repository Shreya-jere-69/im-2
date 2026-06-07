import { useEffect, useState } from "react";
import axios from "axios";

function Reports() {
  const [lowStock, setLowStock] = useState([]);
  const [outOfStock, setOutOfStock] = useState([]);

  const getReports = () => {
    axios
      .get("http://localhost:5000/api/dashboard/low-stock")
      .then((res) => {
        setLowStock(res.data);
      })
      .catch((err) => {
        console.log(err);
      });

    axios
      .get("http://localhost:5000/api/dashboard/out-of-stock")
      .then((res) => {
        setOutOfStock(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getReports();
  }, []);

  return (
    <>
      <div className="header">
        <h1>Reports</h1>
        <p>Low stock and out of stock product reports</p>
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
            {lowStock.map((product) => (
              <tr key={product._id}>
                <td>{product.name}</td>
                <td>{product.category}</td>
                <td>{product.quantity}</td>
                <td>{product.supplier}</td>
              </tr>
            ))}

            {lowStock.length === 0 && (
              <tr>
                <td colSpan="4" className="empty-text">
                  No low stock products
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="table-box">
        <h2>Out of Stock Products</h2>

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
            {outOfStock.map((product) => (
              <tr key={product._id}>
                <td>{product.name}</td>
                <td>{product.category}</td>
                <td>{product.quantity}</td>
                <td>{product.supplier}</td>
              </tr>
            ))}

            {outOfStock.length === 0 && (
              <tr>
                <td colSpan="4" className="empty-text">
                  No out of stock products
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default Reports;