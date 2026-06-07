import { useEffect, useState } from "react";
import axios from "axios";

function Sales() {
  const [products, setProducts] = useState([]);
  const [sales, setSales] = useState([]);

  const [formData, setFormData] = useState({
    productId: "",
    quantity: "",
    sellingPrice: "",
    customerName: ""
  });

  const getProducts = () => {
    axios
      .get("http://localhost:5000/api/products")
      .then((res) => {
        setProducts(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getSales = () => {
    axios
      .get("http://localhost:5000/api/sales")
      .then((res) => {
        setSales(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const deleteSale = (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this sale?");

    if (confirmDelete) {
      axios
        .delete(`http://localhost:5000/api/sales/${id}`)
        .then(() => {
          alert("Sale deleted successfully");
          getSales();
        })
        .catch((err) => {
          console.log(err);
          alert("Failed to delete sale");
        });
    }
  };

  const exportSalesCSV = () => {
    if (sales.length === 0) {
      alert("No sales to export");
      return;
    }

    const headers = [
      "Product",
      "Quantity",
      "Selling Price",
      "Total Amount",
      "Customer",
      "Date"
    ];

    const rows = sales.map((sale) => [
      sale.productName,
      sale.quantity,
      sale.sellingPrice,
      sale.totalAmount,
      sale.customerName || "",
      new Date(sale.saleDate).toLocaleDateString()
    ]);

    const csvContent = [
      headers.join(","),
      ...rows.map((row) => row.join(","))
    ].join("\n");

    const blob = new Blob([csvContent], {
      type: "text/csv;charset=utf-8;"
    });

    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "sales_report.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  useEffect(() => {
    getProducts();
    getSales();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const addSale = (e) => {
    e.preventDefault();

    axios
      .post("http://localhost:5000/api/sales", formData)
      .then(() => {
        alert("Sale added successfully");

        setFormData({
          productId: "",
          quantity: "",
          sellingPrice: "",
          customerName: ""
        });

        getProducts();
        getSales();
      })
      .catch((err) => {
        console.log(err);
        alert(err.response?.data?.message || "Failed to add sale");
      });
  };

  return (
    <>
      <div className="header">
        <h1>Sales</h1>
        <p>Add sales and view sales records</p>
      </div>

      <div className="form-box">
        <h2>Add Sale</h2>

        <form onSubmit={addSale}>
          <label>Product</label>
          <select
            name="productId"
            value={formData.productId}
            onChange={handleChange}
            required
          >
            <option value="">Select Product</option>
            {products.map((product) => (
              <option key={product._id} value={product._id}>
                {product.name} - Stock: {product.quantity}
              </option>
            ))}
          </select>

          <label>Quantity</label>
          <input
            type="number"
            name="quantity"
            value={formData.quantity}
            onChange={handleChange}
            required
          />

          <label>Selling Price</label>
          <input
            type="number"
            name="sellingPrice"
            value={formData.sellingPrice}
            onChange={handleChange}
            required
          />

          <label>Customer Name</label>
          <input
            type="text"
            name="customerName"
            value={formData.customerName}
            onChange={handleChange}
          />

          <button type="submit">Add Sale</button>
        </form>
      </div>

      <div className="table-box">
        <h2>Sales List</h2>

        <button className="export-btn" onClick={exportSalesCSV}>
          Export Sales CSV
        </button>

        <table className="product-table">
          <thead>
            <tr>
              <th>Product</th>
              <th>Quantity</th>
              <th>Selling Price</th>
              <th>Total Amount</th>
              <th>Customer</th>
              <th>Date</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {sales.map((sale) => (
              <tr key={sale._id}>
                <td>{sale.productName}</td>
                <td>{sale.quantity}</td>
                <td>Rs. {sale.sellingPrice}</td>
                <td>Rs. {sale.totalAmount}</td>
                <td>{sale.customerName}</td>
                <td>{new Date(sale.saleDate).toLocaleDateString()}</td>
                <td>
                  <button
                    className="delete-btn"
                    onClick={() => deleteSale(sale._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}

            {sales.length === 0 && (
              <tr>
                <td colSpan="7" className="empty-text">
                  No sales found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default Sales;