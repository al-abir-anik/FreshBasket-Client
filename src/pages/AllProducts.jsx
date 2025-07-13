import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import { useAppContext } from "../contexts/AppContext";
import { useParams } from "react-router-dom";

const AllProducts = () => {
  const { category } = useParams();
  const {
    handleAddToCart,
    cartBtnLoading,
    search,
    fetchLoading,
    setFetchLoading,
  } = useAppContext();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    setFetchLoading(true);
    fetch(
      `http://localhost:3000/all-products?search=${search}&category=${category}`
    )
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setFetchLoading(false);
      })
      .catch((error) => {
        console.log(error.message);
        setFetchLoading(false);
      });
  }, [search, category, setFetchLoading]);

  return (
    <div className="w-4/5 mx-auto mt-16 pb-8 min-h-screen">
      <div className="flex flex-col items-end w-max">
        <h2 className="text-2xl md:text-3xl font-medium uppercase">
          {category ? category : "All Products"}
        </h2>
        <span className="w-20 h-0.5 bg-primary rounded-full"></span>
      </div>

      {fetchLoading ? (
        <div className="min-h-[60vh] flex items-center justify-center">
          <div className="loader"></div>
        </div>
      ) : (
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
      )}
    </div>
  );
};

export default AllProducts;
