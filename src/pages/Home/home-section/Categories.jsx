import { useNavigate } from "react-router-dom";
import { categories } from "../../../assets/assets";

const Categories = () => {
  const navigate = useNavigate();

  return (
    <div className="w-11/12 mx-auto mt-16">
      <h2 className="text-2xl md:text-3xl font-medium">Categories</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 mt-6 gap-6">
        {categories.map((category, index) => (
          <div
            key={index}
            className="group py-5 px-3 gap-2 rounded-lg flex flex-col justify-center items-center cursor-pointer"
            style={{ backgroundColor: category.bgColor }}
            onClick={() => {
              navigate(`/all-products/${category.path.toLowerCase()}`);
              scrollTo(0, 0);
            }}
          >
            <img
              src={category.image}
              alt={category.text}
              className="group-hover:scale-110 transition max-w-28"
            />
            <p className="text-sm font-medium">{category.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Categories;
