import { useContext, useEffect, useState } from "react";
import AuthContext from "../contexts/AuthContext/AuthContext";

const MyFoodRequest = () => {
  const { user } = useContext(AuthContext);
  const [requestedFoods, setRequestedFoods] = useState([]);

  useEffect(() => {
    fetch(`https://food-bridge-server-hazel.vercel.app/requestedFoods?email=${user?.email}`)
      .then((res) => res.json())
      .then((data) => setRequestedFoods(data))
      .catch((error) => console.log(error.message));
  }, [user.email]);

  return (
    <div className="container mx-auto px-4 py-8 my-20">
      <h1 className="text-3xl font-bold text-center mb-8">My Food Requests</h1>
      {requestedFoods.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
            <thead>
              <tr className="bg-gray-100 text-left">
                <th className="px-4 py-2 border">Image</th>
                <th className="px-4 py-2 border">Food Name</th>
                <th className="px-4 py-2 border">Donator Name</th>
                <th className="px-4 py-2 border">Request Notes</th>
                <th className="px-4 py-2 border">Status</th>
                <th className="px-4 py-2 border">Request Date</th>
              </tr>
            </thead>
            <tbody>
              {requestedFoods.map((food) => (
                <tr key={food._id} className="hover:bg-gray-50">
                  <td className="px-4 py-2 border">
                    <img
                      src={food.imageUrl}
                      alt={food.foodName}
                      className="w-16 h-16 object-cover rounded-md"
                    />
                  </td>
                  <td className="px-4 py-2 border">{food.foodName}</td>
                  <td className="px-4 py-2 border">{food.userEmail}</td>
                  <td className="px-4 py-2 border">{food.notes}</td>
                  <td className="px-4 py-2 border">{food.status}</td>
                  <td className="px-4 py-2 border">{food.requestDate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-center text-gray-600">No food requests found.</p>
      )}
    </div>
  );
};

export default MyFoodRequest;
