/* eslint-disable react/prop-types */
import { useContext } from "react";
import AuthContext from "../../contexts/AuthContext/AuthContext";
import { Link } from "react-router-dom";

const FoodCard = ({ food }) => {
  const { user } = useContext(AuthContext);

  return (
    <div className="w-96 rounded-lg overflow-hidden shadow-lg bg-white">
      <img
        className="w-full h-64 object-cover"
        src={food.imageUrl}
        alt="Food Image"
      />
      <div className="p-4">
        <h3 className="text-xl font-semibold text-gray-800">{food.foodName}</h3>
        <p className="text-sm text-gray-600">Quantity: {food.quantity}</p>
        <p className="text-sm text-gray-600">
          Expiration date: {food.expireDate}
        </p>
        {/* <p className="text-sm text-gray-600">Status: {food.status}</p> */}
        <Link to={user ? `/foodDetails/${food._id}` : "logIn"}>
          <button className="mt-4 w-full py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300">
            See Details
          </button>
        </Link>
      </div>
    </div>
  );
};

export default FoodCard;
