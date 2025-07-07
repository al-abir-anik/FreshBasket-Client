import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import AuthProvider from "./auth/AuthProvider.jsx";
import { AdminContextProvider } from "./contexts/AdminContext.jsx";
import Routes from "./routes/Routes.jsx";
import "./style/index.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <AdminContextProvider>
        <RouterProvider router={Routes}></RouterProvider>
      </AdminContextProvider>
    </AuthProvider>
  </StrictMode>
);
