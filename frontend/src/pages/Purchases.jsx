import { useEffect, useState } from "react";
import axios from "axios";

function Purchases() {
  const [products, setProducts] = useState([]);
  const [purchases, setPurchases] = useState([]);

  const [formData, setFormData] = useState({
    productId: "",
    supplierName: "",
    quantity: "",
    purchasePrice: ""
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

  const getPurchases = () => {
    axios
      .get("http://localhost:5000/api/purchases")
      .then((res) => {
        setPurchases(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const deletePurchase = (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this purchase?");

    if (confirmDelete) {
      axios
        .delete(`http://localhost:5000/api/purchases/${id}`)
        .then(() => {
          alert("Purchase deleted successfully");
          getPurchases();
        })
        .catch((err) => {
          console.log(err);
          alert("Failed to delete purchase");
        });
    }
  };

  const exportPurchasesCSV = () => {
    if (purchases.length === 0) {
      alert("No purchases to export");
      return;
    }

    const headers = [
      "Product",
      "Supplier",
      "Quantity",
      "Purchase Price",
      "Total Amount",
      "Date"
    ];

    const rows = purchases.map((purchase) => [
      purchase.productName,
      purchase.supplierName || "",
      purchase.quantity,
      purchase.purchasePrice,
      purchase.totalAmount,
      new Date(purchase.purchaseDate).toLocaleDateString()
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
    link.setAttribute("download", "purchases_report.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  useEffect(() => {
    getProducts();
    getPurchases();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const addPurchase = (e) => {
    e.preventDefault();

    axios
      .post("http://localhost:5000/api/purchases", formData)
      .then(() => {
        alert("Purchase added successfully");

        setFormData({
          productId: "",
          supplierName: "",
          quantity: "",
          purchasePrice: ""
        });

        getProducts();
        getPurchases();
      })
      .catch((err) => {
        console.log(err);
        alert(err.response?.data?.message || "Failed to add purchase");
      });
  };

  return (
    <>
      <div className="header">
        <h1>Purchases</h1>
        <p>Add purchase stock and view purchase records</p>
      </div>

      <div className="form-box">
        <h2>Add Purchase</h2>

        <form onSubmit={addPurchase}>
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
                {product.name} - Current Stock: {product.quantity}
              </option>
            ))}
          </select>

          <label>Supplier Name</label>
          <input
            type="text"
            name="supplierName"
            value={formData.supplierName}
            onChange={handleChange}
          />

          <label>Quantity</label>
          <input
            type="number"
            name="quantity"
            value={formData.quantity}
            onChange={handleChange}
            required
          />

          <label>Purchase Price</label>
          <input
            type="number"
            name="purchasePrice"
            value={formData.purchasePrice}
            onChange={handleChange}
            required
          />

          <button type="submit">Add Purchase</button>
        </form>
      </div>

      <div className="table-box">
        <h2>Purchase List</h2>

        <button className="export-btn" onClick={exportPurchasesCSV}>
          Export Purchases CSV
        </button>

        <table className="product-table">
          <thead>
            <tr>
              <th>Product</th>
              <th>Supplier</th>
              <th>Quantity</th>
              <th>Purchase Price</th>
              <th>Total Amount</th>
              <th>Date</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {purchases.map((purchase) => (
              <tr key={purchase._id}>
                <td>{purchase.productName}</td>
                <td>{purchase.supplierName}</td>
                <td>{purchase.quantity}</td>
                <td>Rs. {purchase.purchasePrice}</td>
                <td>Rs. {purchase.totalAmount}</td>
                <td>{new Date(purchase.purchaseDate).toLocaleDateString()}</td>
                <td>
                  <button
                    className="delete-btn"
                    onClick={() => deletePurchase(purchase._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}

            {purchases.length === 0 && (
              <tr>
                <td colSpan="7" className="empty-text">
                  No purchases found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default Purchases;