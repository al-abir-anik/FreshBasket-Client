import { useEffect, useState } from "react";
import ProductCard from "../../../components/ProductCard";
import { dummyProducts } from "../../../assets/assets";

const BestSeller = () => {
  const [products, setProducts] = useState([]);

  //   useEffect(() => {
  //     fetch(`http://localhost:5000/all-games`)
  //       .then((res) => res.json())
  //       .then((data) => {
  //         setProducts(data);
  //       })
  //       .catch((error) => {
  //         console.log(error.message);
  //       });
  //   }, []);

  useEffect(() => {
    setProducts(dummyProducts);
  }, []);

  return (
    <div className="w-11/12 mx-auto mt-16">
      <h2 className="text-2xl md:text-3xl font-medium">Best Sellers</h2>
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-6 gap-3 md:gap-6">
        {products.slice(1,12).map((p) => (
          <ProductCard key={p._id} product={p} />
        ))}
      </div>
    </div>
  );
};

export default BestSeller;
