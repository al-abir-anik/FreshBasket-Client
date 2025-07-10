import { useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";
import { assets } from "../assets/assets";
import ProductCard from "../components/ProductCard";

const ProductDetails = () => {
  const product = useLoaderData();
  const {
    _id,
    name,
    category,
    price,
    offerPrice,
    rating,
    image,
    description,
    createdAt,
    updatedAt,
    inStock,
  } = product;
  const [thumbnail, setThumbnail] = useState(image[0]);
  const [relatedProducts, setRelatedProducts] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:3000/related-products?id=${_id}`)
      .then((res) => res.json())
      .then((data) => {
        setRelatedProducts(data);
      })
      .catch((error) => {
        console.log(error.message);
      });
  }, [_id]);

  return (
    <div className="w-5/6 lg:w-3/4 xl:w-2/3 mx-auto mt-16">
      <p className="mb-10">
        <span> {category}</span> /<span className="text-primary"> {name}</span>
      </p>

      <div className="flex flex-col md:flex-row justify-between gap-12">
        <div className="flex gap-3">
          <div className="flex flex-col gap-3">
            {image.map((img, index) => (
              <div
                key={index}
                onClick={() => setThumbnail(img)}
                className="border max-w-24 border-gray-500/30 rounded overflow-hidden cursor-pointer"
              >
                <img src={img} alt="product-image" />
              </div>
            ))}
          </div>

          <div className="border border-gray-500/30 max-w-100 rounded overflow-hidden">
            <img
              src={thumbnail}
              alt="Selected product"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        <div className="text-sm w-full md:w-1/2">
          <h1 className="text-3xl font-medium">{name}</h1>
          {/* rating star */}
          <div className="flex items-center gap-0.5 mt-2">
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
            <p className="text-base ml-2">({rating})</p>
          </div>
          {/* Descriptions */}
          <div className="mt-6">
            <p className="text-gray-500/70 line-through">PRICE: ${price}</p>
            <p className="text-2xl font-medium">OFFER PRICE: ${offerPrice}</p>
            <span className="text-gray-500/70">(exclusive taxes)</span>
          </div>
          <p className="text-base font-medium mt-6">About this Product</p>
          <ul className="list-disc ml-4 text-gray-500/70">
            {description.map((desc, index) => (
              <li key={index}>{desc}</li>
            ))}
          </ul>
          <p
            className={`text-lg font-medium mt-6 ${
              inStock ? "text-primary" : "text-red-400"
            }`}
          >
            {inStock ? "In Stock" : "Stock Out"}
          </p>
          {/* Buttons */}
          <div className="w-3/4 flex items-center mt-10 gap-4 text-base">
            <button className="w-full py-3.5 cursor-pointer font-medium bg-gray-100 text-gray-800/80 hover:bg-gray-200 transition">
              Add to Cart
            </button>
            <button className="w-full py-3.5 cursor-pointer font-medium bg-primary text-white hover:bg-primary-dull transition">
              Buy now
            </button>
          </div>
        </div>
      </div>

      {/* ------Related Products-------- */}
      <div className="flex flex-col items-center mt-16">
        <div className="py-10 flex flex-col items-center w-max">
          <h3 className="text-3xl font-medium">Related Products</h3>
          <div className="w-20 h-0.5 bg-primary rounded-full mt-2"></div>
        </div>
        <div className="w-full flex flex-wrap justify-evenly gap-3 md:gap-6">
          {relatedProducts.map((p) => (
            <ProductCard key={p._id} product={p} />
          ))}
        </div>
        <button
          onClick={() =>
            console.log("navigate to all-products and scroll to 0,0")
          }
          className="mx-auto px-12 my-16 py-2.5 border rounded text-primary hover:bg-primary/10 transition cursor-pointer"
        >
          See more
        </button>
      </div>
    </div>
  );
};

export default ProductDetails;
