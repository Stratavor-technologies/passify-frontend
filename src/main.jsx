import React, { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import App from "./App.jsx";
import "./index.css";
import "boxicons";

ReactDOM.createRoot(document.getElementById("root")).render(
  <>
    <App />
    <ToastContainer />
  </>
);
