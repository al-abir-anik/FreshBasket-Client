import { useContext, useState } from "react";
import AuthContext from "../auth/AuthContext";
import { assets } from "../assets/assets";
import { useForm } from "react-hook-form";

const UserProfile = ({ setShowProfileModal }) => {
  const { user, updateUserProfile } = useContext(AuthContext);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const [editMode, setEditMode] = useState(false);
  const [address, setAddress] = useState("");

  const updateUserInfo = (data) => {
    const { name, email, phone, address } = data;

    setEditMode(false);
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
            onSubmit={handleSubmit(updateUserInfo)}
            className="w-full flex flex-col gap-3 items-start"
          >
            {/* name */}
            <div className="w-full">
              {/* <p>Name</p> */}
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
            <div className="w-full">
              {/* <p>Email</p> */}
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
            </div>
            {/* phone number */}
            <div className="w-full">
              {/* <p>Phone Number</p> */}
              <input
                {...register("number", {
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
                defaultValue={user.phoneNumber}
                required
              />
              {errors.number && (
                <p className="text-red-400 text-xs mt-2">
                  {errors.number.message}
                </p>
              )}
            </div>
            {/*     address     */}
            <div className="w-full">
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
                required
              ></textarea>
              {errors.address && (
                <p className="text-red-400">{errors.address.message}</p>
              )}
            </div>

            <button className="bg-primary text-white text-sm w-full py-2 rounded cursor-pointer">
              Save Changes
            </button>
          </form>
        ) : (
          <div className="mx-auto flex justify-center my-3">
            <div className="w-28 h-28 rounded-full overflow-hidden">
              <img
                className="h-32 object-cover object-top"
                src={
                  user.photoURL === null ? assets.profile_icon : user.photoURL
                }
              />
            </div>
            <div className="flex flex-col items-center">
              <p className="font-medium">{user.displayName}</p>
              <p className="text-gray-500 text-sm">{user.email}</p>
              <p className="text-gray-500 text-sm">
                {user.phoneNumber === null
                  ? "Phone Number not found"
                  : user.phoneNumber}
              </p>
              <p className="text-gray-500 text-sm">
                {address === null ? "Address not found" : address}
              </p>
            </div>
          </div>
        )}

        {!editMode && (
          <button
            onClick={() => setEditMode(true)}
            className="border text-sm text-gray-500 border-gray-300 w-28 h-8 rounded mt-5 flex items-center justify-center gap-1 cursor-pointer"
          >
            <p className="">Update Profile</p>
          </button>
        )}

        {/* {editMode ? (
          <button
            onClick={handleUpdate}
            className="bg-primary text-white text-sm w-full py-2 rounded mt-4 cursor-pointer"
          >
            Save Changes
          </button>
        ) : (
          <button
            onClick={() => setEditMode(true)}
            className="border text-sm text-gray-500 border-gray-300 w-28 h-8 rounded mt-5 flex items-center justify-center gap-1 cursor-pointer"
          >
            <p className="">Update Profile</p>
          </button>
        )} */}
      </div>
    </div>
  );
};

export default UserProfile;
