import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../contexts/AuthContext/AuthContext";

const ManageProfile = () => {
  const { updateUserProfile, loading } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleUpdateInfo = async (e) => {
    e.preventDefault();
    const photo = e.target.photo.value;
    const fullname = e.target.fullname.value;

    await updateUserProfile({ displayName: fullname, photoURL: photo });
    navigate("/dashboard");
  };

  return (
    <div className="flex items-center justify-center p-6 lg:mt-20">
      {loading ? (
        <div className="h-screen flex justify-center items-center">
          <span className="loading loading-spinner loading-lg mb-52"></span>
        </div>
      ) : (
        <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
          {/* Title */}
          <h2 className="text-3xl font-bold text-gray-800 text-center mb-6">
            Update Profile
          </h2>

          {/* Form */}
          <form onSubmit={handleUpdateInfo} className="space-y-6">
            {/* Photo URL Input */}
            <div>
              <label className="block text-sm font-medium text-gray-600">
                Photo URL
              </label>
              <input
                type="text"
                name="photo"
                placeholder="Enter your photo URL"
                required
                className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Name Input */}
            <div>
              <label className="block text-sm font-medium text-gray-600">
                Full Name
              </label>
              <input
                type="text"
                name="fullname"
                placeholder="Enter your name"
                required
                className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Update Button */}
            <button
              type="submit"
              className="w-full py-2 px-4 bg-blue-500 text-white text-lg font-semibold rounded-md hover:bg-blue-600 transition-all">
              Update
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default ManageProfile;
