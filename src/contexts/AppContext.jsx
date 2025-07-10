import { createContext, useContext, useEffect, useState } from "react";
import AuthContext from "../auth/AuthContext";

export const AppContext = createContext(null);

export const AppContextProvider = ({ children }) => {
  const { loading, user } = useContext(AuthContext);
  const [cartProduct, setCartProduct] = useState([]);

  useEffect(() => {
    if (user?.email) {
      fetch(`http://localhost:3000/user-cartlist-2?email=${user.email}`)
        .then((res) => res.json())
        .then((data) => setCartProduct(data))
        .catch((error) => console.log(error.message));
    }
  }, [user]);

  const appInfo = { cartProduct, setCartProduct };

  return (
    <AppContext.Provider value={appInfo}>
      {loading ? (
        <div className="min-h-screen flex items-center justify-center">
          <div className="loader"></div>
        </div>
      ) : (
        children
      )}
    </AppContext.Provider>
  );
};

// a Hook for easy import of App Context
export const useAppContext = () => {
  return useContext(AppContext);
};
