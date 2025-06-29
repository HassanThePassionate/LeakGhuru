import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { EmployeeProvider } from "./context/employee-context.tsx";
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <EmployeeProvider>
      <App />
      <ToastContainer position="bottom-right" autoClose={5000} theme="dark" />
    </EmployeeProvider>
  </StrictMode>
);
