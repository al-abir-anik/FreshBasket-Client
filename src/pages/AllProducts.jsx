import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import { useAppContext } from "../contexts/AppContext";

const AllProducts = () => {
  const [products, setProducts] = useState([]);
  const { handleAddToCart, cartBtnLoading } = useAppContext();

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
            handleAddToCart={handleAddToCart}
            cartBtnLoading={cartBtnLoading}
          />
        ))}
      </div>
    </div>
  );
};

export default AllProducts;
