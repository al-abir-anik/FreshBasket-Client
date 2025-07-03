import { useState } from "react";
import { PiShoppingCartSimple } from "react-icons/pi";
import { assets } from "../assets/assets";

const ProductCard = ({ product }) => {
  const [count, setCount] = useState(0);

  return (
    <div className="border border-gray-500/20 rounded-md md:px-4 px-3 py-2 bg-white min-w-56 max-w-56 w-full">
      <div className="group cursor-pointer flex items-center justify-center px-2">
        <img
          className="group-hover:scale-105 transition max-w-26 md:max-w-36"
          src={product.image}
          alt={product.name}
        />
      </div>
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
          <div className="text-primary">
            {count === 0 ? (
              <button
                className="flex items-center justify-center gap-1 bg-green-50 border border-primary/30 md:w-[80px] w-[64px] h-[34px] rounded text-primary-dull font-medium"
                onClick={() => setCount(1)}
              >
                <PiShoppingCartSimple />
                Add
              </button>
            ) : (
              <div className="flex items-center justify-center gap-2 md:w-20 w-16 h-[34px] bg-primary/25 rounded select-none">
                <button
                  onClick={() => setCount((prev) => Math.max(prev - 1, 0))}
                  className="cursor-pointer text-md px-2 h-full"
                >
                  -
                </button>
                <span className="w-5 text-center">{count}</span>
                <button
                  onClick={() => setCount((prev) => prev + 1)}
                  className="cursor-pointer text-md px-2 h-full"
                >
                  +
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
