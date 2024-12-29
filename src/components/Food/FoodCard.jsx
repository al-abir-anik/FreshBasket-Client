/* eslint-disable react/prop-types */
import { useContext } from "react";
import AuthContext from "../../contexts/AuthContext/AuthContext";
import { Link } from "react-router-dom";

const FoodCard = ({ food }) => {
  const { user } = useContext(AuthContext);

  return (
    <div className="w-96 bg-white shadow-lg rounded-2xl overflow-hidden mx-auto">
      <img
        src={food.imageUrl}
        alt="Food"
        className="w-full h-64 object-cover"
      />
      <div className="p-4">
        <h2 className="text-lg font-bold text-gray-800">{food.foodName}</h2>
        <p className="text-gray-600 mt-1">
          Quantity: <span className="font-medium">{food.quantity}</span>
        </p>
        <p className="text-gray-600 mt-1">
          Location: <span className="font-medium">{food.location}</span>
        </p>
        <p className="text-gray-600 mt-1">
          Expire Date: <span className="font-medium">{food.expireDate}</span>
        </p>
      </div>
      <div className="p-4 bg-gray-100">
        <Link to={user ? `/foodDetails/${food._id}` : "logIn"}>
          <button className="w-full bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
            See Details
          </button>
        </Link>
      </div>
    </div>
  );
};

export default FoodCard;
