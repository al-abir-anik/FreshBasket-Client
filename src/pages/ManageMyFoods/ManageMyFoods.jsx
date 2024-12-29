import { useContext, useEffect, useState } from "react";
import AuthContext from "../../contexts/AuthContext/AuthContext";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const ManageMyFoods = () => {
  const { user } = useContext(AuthContext);
  const [userFoods, setUserFoods] = useState([]);

  
  useEffect(() => {
    fetch(`https://food-bridge-server-hazel.vercel.app/userFoods?email=${user?.email}`)
    .then((res) => res.json())
    .then((data) => setUserFoods(data))
    .catch((error) => console.log(error.message));
  }, [user.email]);

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`https://food-bridge-server-hazel.vercel.app/foods/${id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.deletedCount > 0) {
              Swal.fire({
                title: "Deleted!",
                text: "Your food has been deleted.",
                icon: "success",
              });
              const remainingFoods = userFoods.filter((food) => food._id !== id);
              setUserFoods(remainingFoods);
            }
          });
      }
    });
  };

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">Manage Foods</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 rounded-md shadow-md">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="px-4 py-2 border">Image</th>
              <th className="px-4 py-2 border">Food Name</th>
              <th className="px-4 py-2 border">Quantity</th>
              <th className="px-4 py-2 border">Pickup Location</th>
              <th className="px-4 py-2 border">Expiry</th>
              <th className="px-4 py-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {userFoods.map((food) => (
              <tr key={food._id} className="hover:bg-gray-50">
                <td className="px-4 py-2 border">
                  <img
                    src={food.imageUrl}
                    alt={food.foodName}
                    className="w-16 h-16 object-cover rounded-md"
                  />
                </td>
                <td className="px-4 py-2 border">{food.foodName}</td>
                <td className="px-4 py-2 border">{food.quantity}</td>
                <td className="px-4 py-2 border">{food.location}</td>
                <td className="px-4 py-2 border">{food.expireDate}</td>
                <td className="px-4 py-2 border">
                  <Link to={`/updateFood/${food._id}`}>
                    <button className="bg-blue-500 text-white px-3 py-1 rounded-md mr-2 hover:bg-blue-600">
                      Update
                    </button>
                  </Link>
                  <button
                    onClick={() => handleDelete(food._id)}
                    className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageMyFoods;
