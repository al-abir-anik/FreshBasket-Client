import { useEffect, useState } from "react";
import ProductCard from "../../../components/ProductCard";
import { useAppContext } from "../../../contexts/AppContext";

const BestSeller = () => {
  const [bestProducts, setBestProducts] = useState([]);
  const { handleAddToCart, cartBtnLoading } = useAppContext();

  useEffect(() => {
    fetch(`http://localhost:3000/best-seller`)
      .then((res) => res.json())
      .then((data) => {
        setBestProducts(data);
      })
      .catch((error) => {
        console.log(error.message);
      });
  }, []);

  return (
    <div className="w-11/12 mx-auto mt-16">
      <h2 className="text-2xl md:text-3xl font-medium">Best Sellers</h2>
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-6 gap-3 md:gap-6">
        {bestProducts.map((p) => (
          <ProductCard
            key={p._id}
            product={p}
            handleAddToCart={handleAddToCart}
            cartBtnLoading={cartBtnLoading}
          />
        ))}
      </div>
    </div>
  );
};

export default BestSeller;
