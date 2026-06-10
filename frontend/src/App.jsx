import { Routes, Route, Link, Navigate, useNavigate } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Products from "./pages/Products";
import AddProduct from "./pages/AddProduct";
import EditProduct from "./pages/EditProduct";
import Suppliers from "./pages/Suppliers";
import Sales from "./pages/Sales";
import Purchases from "./pages/Purchases";
import Reports from "./pages/Reports";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Categories from "./pages/Categories";
import NotFound from "./pages/NotFound";
import Images from "./pages/Images";
import Header from "./Components/Header.js";
import Footer from "./Components/Footer.js";
import ProductList from "./pages/ProductList";

function AppLayout() {
  const navigate = useNavigate();
  const loggedInUser = localStorage.getItem("loggedInUser") || "User";

  const logout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("loggedInUser");
    navigate("/login");
  };

  return (
    <div className="app-container">
      {/* Header at the top */}
      <Header />

      <div className="layout-body">
        <aside className="sidebar">
          <h2>Inventory</h2>
          <p className="user-info">Welcome, {loggedInUser}</p>

          <Link to="/">Dashboard</Link>
          <Link to="/products">Products</Link>
          <Link to="/add-product">Add Product</Link>
          <Link to="/categories">Categories</Link>
          <Link to="/suppliers">Suppliers</Link>
          <Link to="/sales">Sales</Link>
          <Link to="/purchases">Purchases</Link>
          <Link to="/reports">Reports</Link>

          <button className="logout-btn" onClick={logout}>
            Logout
          </button>
        </aside>

        <main className="main">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/products" element={<Products />} />
            <Route path="/add-product" element={<AddProduct />} />
            <Route path="/edit-product/:id" element={<EditProduct />} />
            <Route path="/categories" element={<Categories />} />
            <Route path="/suppliers" element={<Suppliers />} />
            <Route path="/sales" element={<Sales />} />
            <Route path="/purchases" element={<Purchases />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/images" element={<Images />} />
            <Route path="*" element={<NotFound />} />
            <Route path="/products" element={<ProductList />} />
          </Routes>
        </main>
      </div>

      {/* Footer at the bottom */}
      <Footer />
    </div>
  );
}

function ProtectedRoute() {
  const isLoggedIn = localStorage.getItem("isLoggedIn");
  return isLoggedIn ? <AppLayout /> : <Navigate to="/login" />;
}

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/*" element={<ProtectedRoute />} />
    </Routes>
  );
}

export default App;
