import { PiShoppingCartSimple } from "react-icons/pi";
import { assets } from "../assets/assets";
import { Link } from "react-router-dom";
import { FiCheck } from "react-icons/fi";
import { useAppContext } from "../contexts/AppContext";

const ProductCard = ({ product, handleAddToCart, cartBtnLoading }) => {
  const { cartItems } = useAppContext();

  const isCarted = cartItems?.some(
    (p) => String(p._id) === String(product._id)
  );

  return (
    <div className="border border-gray-500/20 rounded-md md:px-4 px-3 py-2 bg-white min-w-56 max-w-56 w-full">
      <Link
        to={`/product/${product._id}`}
        className="px-2 group cursor-pointer flex items-center justify-center"
      >
        <img
          className="max-w-26 md:max-w-36 min-h-32 group-hover:scale-105 transition"
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
                src={i < product.rating ? assets.star_icon : assets.star_dull_icon}
                alt=""
                className="w-3 md:w-3.5"
              />
            ))}
          <p>({product.rating})</p>
        </div>
        <div className="flex items-end justify-between mt-3">
          <p className="md:text-xl text-base font-medium text-primary">
            ${product.offerPrice}{" "}
            <span className="text-gray-500/60 md:text-sm text-xs line-through">
              ${product.price}
            </span>
          </p>

          <button
            onClick={() => handleAddToCart(product._id)}
            disabled={isCarted}
            className={`w-20 h-9 bg-green-50 border border-primary/30 rounded text-primary font-medium outline-none ${
              isCarted ? "" : "cursor-pointer"
            }`}
          >
            {cartBtnLoading?.[product._id] ? (
              <div className="w-4 h-4 mx-auto border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
            ) : isCarted ? (
              <span className="flex items-center justify-center gap-0.5">
                <FiCheck className="text-base" />
                Added
              </span>
            ) : (
              <span className="flex items-center justify-center gap-1">
                <PiShoppingCartSimple className="text-base" />
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
