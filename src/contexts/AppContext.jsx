import { createContext, useContext, useEffect, useState } from "react";
import AuthContext from "../auth/AuthContext";
import toast from "react-hot-toast";
import axios from "axios";

export const AppContext = createContext(null);

export const AppContextProvider = ({ children }) => {
  const { loading, user } = useContext(AuthContext);
  const [search, setSearch] = useState("");

  // load currentUser cart items with product details
  const [cartItems, setCartItems] = useState([]);
  useEffect(() => {
    fetch(`http://localhost:3000/user-cart-items?email=${user?.email}`)
      .then((res) => res.json())
      .then((data) => {
        setCartItems(data);
      })
      .catch((error) => {
        console.log(error.message);
      });
  }, [user]);

  // Add to Cart Function
  const [cartBtnLoading, setCartBtnLoading] = useState(false);
  const handleAddToCart = async (id) => {
    setCartBtnLoading((prev) => ({ ...prev, [id]: true }));
    try {
      const res = await axios.post(`http://localhost:3000/add-to-cart`, {
        email: user?.email,
        productId: id,
      });

      if (res.data?.error === "Out of stock") {
        toast.error("Item Out of stock");
        return;
      }
      if (res.data.modifiedCount > 0 || res.data.insertedId) {
        const updated = await fetch(
          `http://localhost:3000/user-cart-items?email=${user?.email}`
        );
        const newData = await updated.json();
        setCartItems(newData);
        toast.success("Item Added to cart");
      } else {
        toast.error("Add to cart Failed!");
      }
    } catch (error) {
      toast.error("Something went wrong");
      console.error("Add to cart error:", error);
    } finally {
      setCartBtnLoading((prev) => ({ ...prev, [id]: false }));
    }
  };

  // Remove item from cart Function
  const [rmvBtnLoading, setRmvBtnLoading] = useState({});
  const handleRemoveCartItem = async (id) => {
    setRmvBtnLoading((prev) => ({ ...prev, [id]: true }));
    try {
      const res = await axios.patch(
        `http://localhost:3000/delete-cart-product`,
        {
          email: user?.email,
          productId: id,
        }
      );

      if (res.data.modifiedCount > 0) {
        const updateCart = await fetch(
          `http://localhost:3000/user-cart-items?email=${user?.email}`
        );
        const newData = await updateCart.json();
        setCartItems(newData);
        toast.success("Removed from cart!");
      } else {
        console.error("product delete from cart failed");
        toast.error("Item remove Failed!");
      }
    } catch (error) {
      toast.error("Something went wrong");
      console.error("Item remove error:", error);
    } finally {
      setRmvBtnLoading((prev) => ({ ...prev, [id]: false }));
    }
  };

  const appInfo = {
    handleAddToCart,
    cartBtnLoading,
    handleRemoveCartItem,
    rmvBtnLoading,
    cartItems,
    setCartItems,
    search,
    setSearch
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
