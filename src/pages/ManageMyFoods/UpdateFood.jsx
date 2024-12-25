import { useForm } from "react-hook-form";
import { useLoaderData, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const UpdateFood = () => {
  const navigate = useNavigate();
  const foodData = useLoaderData();
  const { _id, foodName, imageUrl, quantity, location, expireDate, notes } =
    foodData;

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onUpdateFoodSubmit = (data) => {
    const { foodName, imageUrl, quantity, location, expireDate, notes } = data;
    const updatedFood = {
      foodName,
      imageUrl,
      quantity,
      location,
      expireDate,
      notes,
    };

    fetch(`http://localhost:5000/foods/${_id}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(updatedFood),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount > 0) {
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
            title: "Food Updated Successfully",
          });
        }
        navigate("/manageMyFoods");
      });
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-blue-600 text-white py-4 shadow-md">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="text-3xl font-bold">Update Food</h1>
          <p className="text-sm mt-1">
            Share the details of a new movie you want to add to our collection.
          </p>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-2xl font-semibold mb-4 text-center">
            Movie Details
          </h2>
          <p className="text-gray-600 mb-6 text-center">
            Please fill out the form below to add a movie to the portal. Fields
            marked with an asterisk (*) are required.
          </p>

          <form
            onSubmit={handleSubmit(onUpdateFoodSubmit)}
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
                defaultValue={foodName}
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
                defaultValue={imageUrl}
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
                defaultValue={quantity}
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
                defaultValue={location}
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
                defaultValue={expireDate}
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
                defaultValue={notes}
                required
                {...register("notes", {
                  minLength: {
                    value: 10,
                    message:
                      "Additional notes should be at least 10 characters.",
                  },
                })}
                className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              ></textarea>
              {errors.notes && (
                <p className="text-red-500">{errors.notes.message}</p>
              )}
            </div>

            <div className="col-span-1 md:col-span-2 text-center">
              <button
                type="submit"
                className="bg-blue-500 text-white px-6 py-2 rounded-md shadow hover:bg-blue-600 transition"
              >
                Update
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default UpdateFood;
