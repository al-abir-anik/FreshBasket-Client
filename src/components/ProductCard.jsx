import { useState } from "react";
import { PiShoppingCartSimple } from "react-icons/pi";
import { assets } from "../assets/assets";
import { Link } from "react-router-dom";
import { FiCheck } from "react-icons/fi";

const ProductCard = ({ product }) => {
  const [isAdded, setIsAdded] = useState(false);

  const handleAddToCart = () => {

  };

  return (
    <div className="border border-gray-500/20 rounded-md md:px-4 px-3 py-2 bg-white min-w-56 max-w-56 w-full">
      <Link
        to={`/product/${product._id}`}
        className="group cursor-pointer flex items-center justify-center px-2"
      >
        <img
          className="group-hover:scale-105 transition max-w-26 md:max-w-36"
          src={product.image}
          alt={product.name}
        />
      </Link>
      <div className="text-gray-500/60 text-sm">
        <p>{product.category}</p>
        <p className="text-gray-700 font-medium text-lg truncate w-full">
          {product.name}
        </p>
        <div className="flex items-center gap-0.5">
          {Array(5)
            .fill("")
            .map((_, i) => (
              <img
                key={i}
                src={i < 4 ? assets.star_icon : assets.star_dull_icon}
                alt=""
                className="w-3 md:w-3.5"
              />
            ))}
          <p>(4)</p>
        </div>
        <div className="flex items-end justify-between mt-3">
          <p className="md:text-xl text-base font-medium text-primary">
            ${product.offerPrice}{" "}
            <span className="text-gray-500/60 md:text-sm text-xs line-through">
              ${product.price}
            </span>
          </p>

          <button
            className="p-2 bg-green-50 border border-primary/30 rounded text-primary-dull font-medium cursor-pointer"
            onClick={() => setIsAdded(true)}
          >
            {isAdded ? (
              <span className="flex items-center justify-center gap-1">
                <FiCheck />
                Added
              </span>
            ) : (
              <span className="flex items-center justify-center gap-1">
                <PiShoppingCartSimple />
                Add
              </span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
