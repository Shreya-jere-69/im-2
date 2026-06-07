import { useEffect, useState } from "react";
import axios from "axios";

function ProductList() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/products")
      .then((res) => {
        setProducts(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      axios
        .delete(`http://localhost:5000/api/products/${id}`)
        .then(() => {
          setProducts(products.filter((p) => p._id !== id));
        })
        .catch((err) => {
          console.log(err);
          alert("Failed to delete product");
        });
    }
  };

  if (products.length === 0) {
    return <p className="empty-text">No products available</p>;
  }

  return (
    <div>
      <h2 className="inventory-title">Product List</h2>
      <table className="product-table">
        <thead>
          <tr>
            <th>Product</th>
            <th>Category</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Supplier</th>
            <th>Date Added</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {products.map((p) => (
            <tr key={p._id}>
              <td>{p.name}</td>
              <td>{p.category}</td>
              <td>{p.price}</td>
              <td>{p.quantity}</td>
              <td>{p.supplier}</td>
              <td>{new Date(p.createdAt).toLocaleDateString()}</td>
              <td>
                <button
                  className="logout-btn"
                  onClick={() => handleDelete(p._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <button className="clear-btn" style={{ marginTop: "20px" }}>
        Export Products CSV
      </button>
    </div>
  );
}

export default ProductList;
