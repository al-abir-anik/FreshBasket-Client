import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import AuthProvider from "./auth/AuthProvider.jsx";
import { AdminContextProvider } from "./contexts/AdminContext.jsx";
import Routes from "./routes/Routes.jsx";
import "./style/index.css";
import { AppContextProvider } from "./contexts/AppContext.jsx";
import { Toaster } from "react-hot-toast";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <AppContextProvider>
        <AdminContextProvider>
          <>
            <RouterProvider router={Routes}></RouterProvider>
            <Toaster position="top-center" reverseOrder={true} />
          </>
        </AdminContextProvider>
      </AppContextProvider>
    </AuthProvider>
  </StrictMode>
);
