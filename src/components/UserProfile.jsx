import { useContext, useState } from "react";
import AuthContext from "../auth/AuthContext";
import { assets } from "../assets/assets";
import { useForm } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";
import { useAppContext } from "../contexts/AppContext";

const UserProfile = ({ setShowProfileModal }) => {
  const { user, updateUserProfile } = useContext(AuthContext);
  const { userInfo, setUserInfo } = useAppContext();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const [editMode, setEditMode] = useState(false);
  const [updateBtnLoading, setUpdateBtnLoading] = useState(false);

  const handleUpdateUserInfo = async (data) => {
    setUpdateBtnLoading(true);
    const { name, phoneNumber, address } = data;

    try {
      // Update Firebase displayName
      await updateUserProfile({
        displayName: name,
      });
      // Send patch request to backend
      const res = await axios.patch(`https://freshbasket-server-seven.vercel.app/update-user-info`, {
        email: user?.email,
        phoneNumber,
        address,
      });
      // Handle backend response
      if (res.data.modifiedCount > 0) {
        const updated = await fetch(
          `https://freshbasket-server-seven.vercel.app/user-doc?email=${user?.email}`
        );
        const newData = await updated.json();
        setUserInfo(newData);
        toast.success("Profile Updated");
      } else {
        toast.error("Profile update Failed!");
      }
    } catch (error) {
      if (error.response?.data?.message === "No changes detected") {
        toast.error("Nothing Changed.");
      } else {
        console.error("Update failed:", error);
        toast.error("Something went wrong.");
      }
    } finally {
      setEditMode(false);
      setUpdateBtnLoading(false);
    }
  };

  return (
    <div
      onClick={() => setShowProfileModal(false)}
      className="fixed top-0 bottom-0 left-0 right-0 z-99 flex items-center text-sm text-gray-600 bg-black/50"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="flex flex-col gap-6 m-auto items-start p-8 py-8 w-80 sm:w-[352px] rounded-lg shadow-xl border border-gray-200 bg-white"
      >
        <h2 className="text-xl font-medium mx-auto uppercase">
          <span className="text-primary">{editMode ? "Update" : "My"}</span>{" "}
          Profile
        </h2>

        {/* picture */}
        {/* <div className="w-full">
          <input
            {...register("photoFile", {
              required: "Image is required",
            })}
            className="w-full p-2 mt-1 text-sm border border-gray-200 rounded"
            type="file"
            accept="image/*"
            defaultValue={assets.profile_icon}
          />
          {errors.photoFile && (
            <p className="text-red-400 text-xs mt-2">
              {errors.photoFile.message}
            </p>
          )}
        </div> */}

        {editMode ? (
          <form
            onSubmit={handleSubmit(handleUpdateUserInfo)}
            className="w-full flex flex-col gap-3 items-start"
          >
            {/* name */}
            <div className="w-full">
              <p>Name</p>
              <input
                {...register("name", {
                  minLength: {
                    value: 3,
                    message: "name should be at least 3 char.",
                  },
                })}
                className="border border-gray-200 rounded w-full p-2 mt-1 outline-primary"
                defaultValue={user.displayName}
                placeholder="enter your name"
                type="text"
                required
              />
              {errors.name && (
                <p className="text-red-600">{errors.name.message}</p>
              )}
            </div>
            {/* email */}
            {/* <div className="w-full">
              <p>Email</p>
              <input
                {...register("email", {
                  minLength: {
                    value: 5,
                    message: "enter a valid email.",
                  },
                })}
                className="border border-gray-200 rounded w-full p-2 mt-1 outline-primary"
                type="email"
                placeholder="enter your email"
                defaultValue={user.email}
                required
              />
              {errors.email && (
                <p className="text-red-400 text-xs mt-2">
                  {errors.email.message}
                </p>
              )}
            </div> */}
            {/* phone number */}
            <div className="w-full">
              <p>Phone Number</p>
              <input
                {...register("phoneNumber", {
                  minLength: {
                    value: 11,
                    message: "enter a valid phone number.",
                  },
                  pattern: {
                    value: /^01[0-9]{9}$/,
                    message: "enter a valid phone number",
                  },
                })}
                className="border border-gray-200 rounded w-full p-2 mt-1 outline-primary"
                type="tel"
                placeholder="enter your number"
                defaultValue={userInfo.phoneNumber}
                required
              />
              {errors.phoneNumber && (
                <p className="text-red-400 text-xs mt-2">
                  {errors.phoneNumber.message}
                </p>
              )}
            </div>
            {/*     address     */}
            <div className="w-full">
              <p>Address</p>
              <textarea
                {...register("address", {
                  minLength: {
                    value: 5,
                    message: "add a proper address",
                  },
                })}
                rows={2}
                className="w-full p-2 mt-1 rounded border border-gray-200 resize-none outline-none"
                placeholder="enter address"
                defaultValue={userInfo.address}
                required
              ></textarea>
              {errors.address && (
                <p className="text-red-400">{errors.address.message}</p>
              )}
            </div>

            <button
              disabled={updateBtnLoading}
              className={`w-full py-2 text-white text-sm rounded ${
                updateBtnLoading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-primary hover:bg-primary-dull cursor-pointer"
              }`}
            >
              {updateBtnLoading ? "Saving.." : "Save Changes"}
            </button>
          </form>
        ) : (
          <div className="mx-auto flex flex-col justify-center items-center">
            <div className="w-28 h-28 rounded-full overflow-hidden">
              <img
                className="object-cover object-top"
                src={
                  user.photoURL === null ? assets.profile_icon : user.photoURL
                }
              />
            </div>
            <div className="flex flex-col items-center gap-1 mt-2 text-gray-600">
              <p className="text-xl font-medium text-black">
                {user.displayName}
              </p>
              <p className="text-base">{user.email}</p>
              <p className="text-sm">
                {userInfo.phoneNumber === ""
                  ? "phone Number not found"
                  : userInfo.phoneNumber}
              </p>
              <p className="w-11/12 mx-auto text-sm text-center">
                {userInfo.address === ""
                  ? "Address not found"
                  : userInfo.address}
              </p>
            </div>
          </div>
        )}
        {!editMode && (
          <button
            onClick={() => setEditMode(true)}
            className="py-2 px-3 mx-auto border text-sm text-primary-dull hover:bg-primary/5 border-primary rounded cursor-pointer"
          >
            <p className="">Update Profile</p>
          </button>
        )}
      </div>
    </div>
  );
};

export default UserProfile;
