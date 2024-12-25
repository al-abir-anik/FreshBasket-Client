import { useContext } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import AuthContext from "../contexts/AuthContext/AuthContext";

const AddFood = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onAddFoodSubmit = (data) => {
    const { foodName, imageUrl, quantity, location, expireDate, notes } = data;
    const newFood = {
      foodName,
      imageUrl,
      quantity,
      location,
      expireDate,
      notes,
      userName: user.displayName,
      userEmail: user.email,
      userPhotoUrl: user.photoURL,
    };

    fetch("http://localhost:5000/foods", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(newFood),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.insertedId) {
          const Toast = Swal.mixin({
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.onmouseenter = Swal.stopTimer;
              toast.onmouseleave = Swal.resumeTimer;
            },
          });
          Toast.fire({
            icon: "success",
            title: "New Food Added Successfully",
          });
          navigate("/manageMyFoods");
        }
      });
  };

  return (
    <div className="mx-auto w-2/3 my-20">
      <form
        onSubmit={handleSubmit(onAddFoodSubmit)}
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        {/* Food Name */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">
            Food Name *
          </label>
          <input
            type="text"
            placeholder="Enter food name"
            required
            {...register("foodName", {
              minLength: {
                value: 2,
                message: "Food name should be at least 2 characters",
              },
            })}
            className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
          {errors.foodName && (
            <p className="text-red-600">{errors.foodName.message}</p>
          )}
        </div>

        {/* Food Image */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">
            Food Image *
          </label>
          <input
            type="text"
            placeholder="Enter food image URL"
            required
            {...register("imageUrl", {
              pattern: {
                value:
                  /^(https?:\/\/)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(:\d+)?(\/.*)?$/,
                message: "Please enter a valid URL",
              },
            })}
            className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
          {errors.imageUrl && (
            <p className="text-red-500">{errors.imageUrl.message}</p>
          )}
        </div>

        {/* Food Quantity */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">
            Food Quantity (in numbers) *
          </label>
          <input
            type="number"
            placeholder="Enter food quantity"
            required
            {...register("quantity", {
              valueAsNumber: true,
              min: {
                value: 0,
                message: "Quantity must not be a negative number",
              },
            })}
            className="w-full border border-gray-300
                 rounded-md p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
          {errors.quantity && (
            <p className="text-red-500">{errors.quantity.message}</p>
          )}
        </div>

        {/* Pick Up Location */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">
            Pickup Location *
          </label>
          <input
            type="text"
            placeholder="Enter location"
            required
            {...register("location", {
              minLength: {
                value: 3,
                message: "location should be at least 3 characters",
              },
              maxLength: {
                value: 30,
                message: "Location should not be over 30 characters",
              },
            })}
            className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
          {errors.location && (
            <p className="text-red-600">{errors.location.message}</p>
          )}
        </div>

        {/* Expiration Date */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">
            Expiration Date *
          </label>
          <input
            type="date"
            required
            {...register("expireDate", {
              validate: {
                isFutureDate: (value) => {
                  const selectedDate = new Date(value);
                  const currentDate = new Date();
                  return (
                    selectedDate > currentDate ||
                    "Expiration date must be in the future"
                  );
                },
              },
            })}
            className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
          {errors.expireDate && (
            <p className="text-red-600">{errors.expireDate.message}</p>
          )}
        </div>

        {/* Food Status Dropdown */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">
            Food Status *
          </label>
          <select
            required
            {...register("status")}
            className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          >
            <option value="Available">Available</option>
            <option value="Not Available">Not Available</option>
          </select>
          {errors.status && (
            <p className="text-red-500">{errors.status.message}</p>
          )}
        </div>

        {/* Additional Notes */}
        <div className="col-span-1 md:col-span-2">
          <label className="block text-gray-700 font-medium mb-1">
            Additional Notes *
          </label>
          <textarea
            placeholder="Enter additional notes"
            rows="4"
            required
            {...register("notes", {
              minLength: {
                value: 10,
                message: "Additional notes should be at least 10 characters.",
              },
            })}
            className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          ></textarea>
          {errors.notes && (
            <p className="text-red-500">{errors.notes.message}</p>
          )}
        </div>

        {/* Submit Button */}
        <div className="col-span-1 md:col-span-2 text-center">
          <button
            type="submit"
            className="bg-blue-500 text-white px-6 py-2 rounded-md shadow hover:bg-blue-600 transition"
          >
            Add Food
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddFood;
