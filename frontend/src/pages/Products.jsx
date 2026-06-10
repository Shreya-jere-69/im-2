import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function Products() {
  const [products, setProducts] = useState([]);

  const getProducts = () => {
    axios
      .get("http://localhost:5000/api/products")
      .then((res) => {
        setProducts(res.data);
      })
      .catch((err) => {
        console.log(err);
        alert("Failed to load products");
      });
  };

  useEffect(() => {
    getProducts();
  }, []);

  const deleteProduct = (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this product?");

    if (confirmDelete) {
      axios
        .delete(`http://localhost:5000/api/products/${id}`)
        .then(() => {
          alert("Product deleted successfully");
          getProducts();
        })
        .catch((err) => {
          console.log(err);
          alert("Failed to delete product");
        });
    }
  };

  return (
    <>
      <div className="header">
        <h1>Product List</h1>
        <p>All added products are displayed below</p>
      </div>

      <div className="table-box">
        <Link className="small-btn" to="/add-product">
          Add New Product
        </Link>

        <table className="product-table">
          <thead>
            <tr>
              <th>Sl No</th>
              <th>Product Name</th>
              <th>Category</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Supplier</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {products.map((product, index) => (
              <tr key={product._id}>
                <td>{index + 1}</td>
                <td>{product.name}</td>
                <td>{product.category}</td>
                <td>Rs. {product.price}</td>
                <td>{product.quantity}</td>
                <td>{product.supplier}</td>
                <td>
                  <Link className="edit-btn" to={`/edit-product/${product._id}`}>
                    Edit
                  </Link>

                  <button
                    className="delete-btn"
                    onClick={() => deleteProduct(product._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}

            {products.length === 0 && (
              <tr>
                <td colSpan="7" className="empty-text">
                  No products found. Add a product first.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default Products;