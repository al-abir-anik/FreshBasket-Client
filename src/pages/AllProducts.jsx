import { useEffect, useState, useContext } from "react";
import ProductCard from "../components/ProductCard";
import AuthContext from "../auth/AuthContext";
import axios from "axios";
import { useAppContext } from "../contexts/AppContext";
import toast from "react-hot-toast";

const AllProducts = () => {
  const { user } = useContext(AuthContext);
  const [products, setProducts] = useState([]);
  const { setCartProduct } = useAppContext();
  const [btnLoading, setBtnLoading] = useState(false);

  useEffect(() => {
    fetch(`http://localhost:3000/all-products`)
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
      })
      .catch((error) => {
        console.log(error.message);
      });
  }, []);

  const handleAddCartBtn = async (id) => {
    setBtnLoading((prev) => ({ ...prev, [id]: true }));

    const res = await axios.post(`http://localhost:3000/add-to-cart`, {
      email: user?.email,
      productId: id,
    });

    if (res.data.modifiedCount > 0 || res.data.insertedId) {
      const updated = await fetch(
        `http://localhost:3000/user-cartlist-2?email=${user?.email}`
      );
      const newData = await updated.json();
      setCartProduct(newData);
      toast.success('Added to cart!');
    } else {
      console.error("Product added failed");
    }
    setBtnLoading((prev) => ({ ...prev, [id]: false }));
  };

  return (
    <div className="w-4/5 mx-auto mt-16 pb-8 min-h-screen">
      <div className="flex flex-col items-end w-max">
        <h2 className="text-2xl md:text-3xl font-medium uppercase">
          All Products
        </h2>
        <span className="w-20 h-0.5 bg-primary rounded-full"></span>
      </div>
      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-6 gap-3 md:gap-6">
        {products.map((p) => (
          <ProductCard
            key={p._id}
            product={p}
            handleAddCartBtn={handleAddCartBtn}
            btnLoading={btnLoading}
          />
        ))}
      </div>
    </div>
  );
};

export default AllProducts;
