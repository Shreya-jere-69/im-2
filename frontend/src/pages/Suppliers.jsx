import { useEffect, useState } from "react";
import axios from "axios";

function Suppliers() {
  const [suppliers, setSuppliers] = useState([]);

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    address: ""
  });

  const getSuppliers = () => {
    axios
      .get("http://localhost:5000/api/suppliers")
      .then((res) => {
        setSuppliers(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getSuppliers();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const addSupplier = (e) => {
    e.preventDefault();

    axios
      .post("http://localhost:5000/api/suppliers", formData)
      .then(() => {
        alert("Supplier added successfully");
        setFormData({
          name: "",
          phone: "",
          email: "",
          address: ""
        });
        getSuppliers();
      })
      .catch((err) => {
        console.log(err);
        alert("Failed to add supplier");
      });
  };

  const deleteSupplier = (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this supplier?");

    if (confirmDelete) {
      axios
        .delete(`http://localhost:5000/api/suppliers/${id}`)
        .then(() => {
          alert("Supplier deleted successfully");
          getSuppliers();
        })
        .catch((err) => {
          console.log(err);
          alert("Failed to delete supplier");
        });
    }
  };

  return (
    <>
      <div className="header">
        <h1>Suppliers</h1>
        <p>Manage supplier details</p>
      </div>

      <div className="form-box">
        <h2>Add Supplier</h2>

        <form onSubmit={addSupplier}>
          <label>Supplier Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />

          <label>Phone</label>
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
          />

          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />

          <label>Address</label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
          />

          <button type="submit">Add Supplier</button>
        </form>
      </div>

      <div className="table-box">
        <h2>Supplier List</h2>

        <table className="product-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Phone</th>
              <th>Email</th>
              <th>Address</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {suppliers.map((supplier) => (
              <tr key={supplier._id}>
                <td>{supplier.name}</td>
                <td>{supplier.phone}</td>
                <td>{supplier.email}</td>
                <td>{supplier.address}</td>
                <td>
                  <button
                    className="delete-btn"
                    onClick={() => deleteSupplier(supplier._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}

            {suppliers.length === 0 && (
              <tr>
                <td colSpan="5" className="empty-text">
                  No suppliers found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default Suppliers;