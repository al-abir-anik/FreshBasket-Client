import axios from "axios";
import { useForm } from "react-hook-form";

const AddProduct = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const addNewProduct = async (data) => {
    const { imageUrl, productName, description, category, price, offerPrice } =
      data;
    const newProduct = {
      name: productName,
      category,
      price,
      offerPrice,
      rating: 5,
      description,
      image: imageUrl,
      inStock: true,
      createdAt: new Date().toLocaleString(),
    };

    const res = await axios.post(
      `http://localhost:3000/add-product`,
      newProduct
    );

    if (res.data.insertedId) {
      console.log("added");
    } else {
      console.error("Product added failed");
    }
  };

  return (
    <form
      onSubmit={handleSubmit(addNewProduct)}
      className="space-y-5 max-w-lg flex flex-col justify-between bg-white"
    >
      {/*     images     */}
      <div>
        <p className="text-base font-medium">Product Image</p>
        <div className="flex flex-wrap justify-start lg:justify-between items-center gap-3 mt-2">
          {Array(4)
            .fill("")
            .map((_, index) => (
              <label key={index} htmlFor={`image${index}`}>
                <input
                  accept="image/*"
                  type="file"
                  id={`image${index}`}
                  hidden
                />
                <img
                  className="max-w-24 cursor-pointer"
                  src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/e-commerce/uploadArea.png"
                  alt="uploadArea"
                  width={100}
                  height={100}
                />
              </label>
            ))}
        </div>
      </div>

      {/*       name       */}
      <div className="flex flex-col gap-1">
        <label className="text-base font-medium" htmlFor="product-name">
          Product Name
        </label>
        <input
          className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40"
          {...register("productName", {
            minLength: {
              value: 2,
              message: "product name should be at least 2 characters",
            },
          })}
          type="text"
          placeholder="enter product name"
          required
        />
        {errors.productName && (
          <p className="text-red-400">{errors.productName.message}</p>
        )}
      </div>

      {/*     description     */}
      <div className="flex flex-col gap-1">
        <label className="text-base font-medium" htmlFor="product-description">
          Product Description
        </label>
        <textarea
          rows={4}
          className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40 resize-none"
          {...register("description", {
            minLength: {
              value: 10,
              message: "Description should be at least 10 characters.",
            },
          })}
          placeholder="type here"
          required
        ></textarea>
        {errors.description && (
          <p className="text-red-400">{errors.description.message}</p>
        )}
      </div>

      {/*      category     */}
      <div className="w-full flex flex-col gap-1">
        <label className="text-base font-medium" htmlFor="category">
          Category
        </label>
        <select
          className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40"
          {...register("category")}
        >
          <option value="">Select Category</option>
          <option value="Vegetables">Vegetables</option>
          <option value="Foods">Foods</option>
          <option value="Drinks">Drinks</option>
          <option value="Instant">Instant</option>
          <option value="Dairy">Dairy</option>
          <option value="Bakery">Bakery</option>
          <option value="Grains">Grains</option>
        </select>
        {errors.category && (
          <p className="text-red-500">{errors.category.message}</p>
        )}
      </div>

      <div className="flex items-center gap-5 flex-wrap">
        {/*      price      */}
        <div className="flex-1 flex flex-col gap-1 w-32">
          <label className="text-base font-medium" htmlFor="product-price">
            Product Price
          </label>
          <input
            className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40"
            {...register("price")}
            type="number"
            placeholder="0"
            required
          />
          {errors.price && (
            <p className="text-red-400">{errors.price.message}</p>
          )}
        </div>

        {/*     offer price    */}
        <div className="flex-1 flex flex-col gap-1 w-32">
          <label className="text-base font-medium" htmlFor="offer-price">
            Offer Price
          </label>
          <input
            className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40"
            {...register("offerPrice")}
            type="number"
            placeholder="0"
          />
          {errors.offerPrice && (
            <p className="text-red-400">{errors.offerPrice.message}</p>
          )}
        </div>
      </div>

      <button className="px-8 py-2.5 mt-1 bg-primary hover:bg-primary-dull text-white font-medium rounded cursor-pointer">
        Add Product
      </button>
    </form>
  );
};

export default AddProduct;
