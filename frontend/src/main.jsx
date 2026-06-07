import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./style.css";
import "./Product.css";
import "./style1.css";
import "./login.css";
import "./style2.css";
import "./style3.css";
import "./Header.css";
import Register from "./pages/Register";
ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);