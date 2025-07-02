import { Link } from "react-router-dom";
import FoodCard from "../../components/Food/FoodCard";

const Featured = ({ allFoods }) => {
  return (
    <div className="w-5/6 lg:w-3/4 mx-auto mt-20 mb-20 space-y-14">
      <div className="space-y-5">
        <h2 className=" text-4xl font-semibold text-center tracking-wider">
          Featured Foods
        </h2>
        <p className=" text-base font-medium text-center">
          Magento extension to create content by drag and drop builtin
          controls.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
        {allFoods.map((food) => (
          <FoodCard key={food._id} food={food}></FoodCard>
        ))}
      </div>

      <Link to={"/availableFoods"}>
        <button className="btn mt-10 uppercase">Explore All Foods</button>
      </Link>
    </div>
  );
};

export default Featured;
