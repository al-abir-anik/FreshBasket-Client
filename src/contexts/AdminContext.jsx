import { createContext, useContext, useState } from "react";
import AuthContext from "../auth/AuthContext";

export const AdminContext = createContext(null);

export const AdminContextProvider = ({ children }) => {
  const { loading, setLoading } = useContext(AuthContext);
  const [isAdmin, setIsAdmin] = useState(false);

  const adminInfo = { isAdmin, setIsAdmin };

  return (
    <AdminContext.Provider value={adminInfo}>
      {loading ? (
        <div className="min-h-screen flex items-center justify-center">
          <div className="loader"></div>
        </div>
      ) : (
        children
      )}
    </AdminContext.Provider>
  );
};

// a Hook for easy import of Admin Context
export const useAdminContext = () => {
  return useContext(AdminContext);
};
