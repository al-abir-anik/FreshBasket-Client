import { createContext, useContext, useEffect, useState } from "react";
import AuthContext from "../auth/AuthContext";
import toast from "react-hot-toast";
import axios from "axios";

export const AppContext = createContext(null);

export const AppContextProvider = ({ children }) => {
  const { loading, user } = useContext(AuthContext);
  const [cartBtnLoading, setCartBtnLoading] = useState(false);

  const [cartProduct, setCartProduct] = useState([]);
  useEffect(() => {
    if (user?.email) {
      fetch(`http://localhost:3000/user-doc?email=${user.email}`)
        .then((res) => res.json())
        .then((data) => setCartProduct(data))
        .catch((error) => console.log(error.message));
    }
  }, [user]);

  // Add to Cart Function
  const handleAddToCart = async (id) => {
    setCartBtnLoading((prev) => ({ ...prev, [id]: true }));

    try {
      const res = await axios.post(`http://localhost:3000/add-to-cart`, {
        email: user?.email,
        productId: id,
      });

      if (res.data.modifiedCount > 0 || res.data.insertedId) {
        const updated = await fetch(
          `http://localhost:3000/user-doc?email=${user?.email}`
        );
        const newData = await updated.json();
        setCartProduct(newData);
        toast.success("Item added to cart");
      } else {
        console.error("Add to cart Failed!");
        toast.error("Add to cart Failed!");
      }
    } catch (error) {
      console.error("Add to cart error:", error);
      toast.error("Something went wrong");
    } finally {
      setCartBtnLoading((prev) => ({ ...prev, [id]: false }));
    }
  };

  const appInfo = {
    cartProduct,
    setCartProduct,
    handleAddToCart,
    cartBtnLoading,
  };

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
