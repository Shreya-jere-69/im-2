import { useEffect, useState } from "react";
import axios from "axios";

function Categories() {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");

  const getCategories = () => {
    axios
      .get("http://localhost:5000/api/categories")
      .then((res) => {
        setCategories(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getCategories();
  }, []);

  const addCategory = (e) => {
    e.preventDefault();

    axios
      .post("http://localhost:5000/api/categories", { name })
      .then(() => {
        alert("Category added successfully");
        setName("");
        getCategories();
      })
      .catch((err) => {
        console.log(err);
        alert("Failed to add category");
      });
  };

  const deleteCategory = (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this category?");

    if (confirmDelete) {
      axios
        .delete(`http://localhost:5000/api/categories/${id}`)
        .then(() => {
          alert("Category deleted successfully");
          getCategories();
        })
        .catch((err) => {
          console.log(err);
          alert("Failed to delete category");
        });
    }
  };

  return (
    <>
      <div className="header">
        <h1>Categories</h1>
        <p>Manage product categories</p>
      </div>

      <div className="form-box">
        <h2>Add Category</h2>

        <form onSubmit={addCategory}>
          <label>Category Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <button type="submit">Add Category</button>
        </form>
      </div>

      <div className="table-box">
        <h2>Category List</h2>

        <table className="product-table">
          <thead>
            <tr>
              <th>Category Name</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {categories.map((category) => (
              <tr key={category._id}>
                <td>{category.name}</td>
                <td>
                  <button
                    className="delete-btn"
                    onClick={() => deleteCategory(category._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}

            {categories.length === 0 && (
              <tr>
                <td colSpan="2" className="empty-text">
                  No categories found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default Categories;