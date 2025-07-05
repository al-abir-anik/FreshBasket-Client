import { useEffect, useState } from "react";
import { dummyProducts } from "../assets/assets";
import ProductCard from "../components/ProductCard";

const AllProducts = () => {
  const [products, setProducts] = useState([]);

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

  // useEffect(() => {
  //   setProducts(dummyProducts);
  // }, []);

  return (
    <div className="w-4/5 mx-auto mt-16">
      <div className="flex flex-col items-end w-max">
        <h2 className="text-2xl md:text-3xl font-medium uppercase">
          All Products
        </h2>
        <span className="w-20 h-0.5 bg-primary rounded-full"></span>
      </div>
      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-6 gap-3 md:gap-6">
        {products.map((p) => (
          <ProductCard key={p._id} product={p} />
        ))}
      </div>
    </div>
  );
};

export default AllProducts;
