import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

const RequestFood = ({ foodDetails, user }) => {
  const navigate = useNavigate();

  const handleRequestModal = () => {
    const currentDate = new Date().toLocaleString();
    const {
      _id,
      foodName,
      imageUrl,
      location,
      expireDate,
      userName,
      userEmail,
    } = foodDetails;

    MySwal.fire({
      title: "Food Request",
      html: `
        <div class="text-left">
          <div class="mb-2">
            <label class="font-bold">Food Name:</label>
            <input class="w-full bg-gray-200 rounded p-2" type="text" value="${foodName}" disabled />
          </div>
          <div class="mb-2">
            <label class="font-bold">Food Image:</label>
            <img src="${imageUrl}" alt="Food" class="w-full rounded" />
          </div>
          <div class="mb-2">
            <label class="font-bold">Food ID:</label>
            <input class="w-full bg-gray-200 rounded p-2" type="text" value="${_id}" disabled />
          </div>
          <div class="mb-2">
            <label class="font-bold">Donator Email:</label>
            <input class="w-full bg-gray-200 rounded p-2" type="text" value="${userEmail}" disabled />
          </div>
          <div class="mb-2">
            <label class="font-bold">Donator Name:</label>
            <input class="w-full bg-gray-200 rounded p-2" type="text" value="${userName}" disabled />
          </div>
          <div class="mb-2">
            <label class="font-bold">User Email:</label>
            <input class="w-full bg-gray-200 rounded p-2" type="text" value="${user.email}" disabled />
          </div>
          <div class="mb-2">
            <label class="font-bold">Request Date:</label>
            <input class="w-full bg-gray-200 rounded p-2" type="text" value="${currentDate}" disabled />
          </div>
          <div class="mb-2">
            <label class="font-bold">Pickup Location:</label>
            <input class="w-full bg-gray-200 rounded p-2" type="text" value="${location}" disabled />
          </div>
          <div class="mb-2">
            <label class="font-bold">Expire Date:</label>
            <input class="w-full bg-gray-200 rounded p-2" type="text" value="${expireDate}" disabled />
          </div>
          <div class="mb-2">
            <label class="font-bold">Additional Notes:</label>
            <textarea class="w-full bg-gray-100 border border-gray-300 rounded p-2" placeholder="Add your notes here"></textarea>
          </div>
        </div>
      `,
      showCancelButton: true,
      confirmButtonText: "Request",
      cancelButtonText: "Cancel",
      preConfirm: () => {
        const notes = Swal.getPopup().querySelector("textarea").value;
        if (!notes) {
          Swal.showValidationMessage("Please enter additional notes.");
        }
        handleFoodRequest(_id, notes);
        return { notes };
      },
    });
  };

  const handleFoodRequest = (id, requestNote) => {
    const currentDate2 = new Date().toLocaleString();

    fetch("https://food-bridge-server-hazel.vercel.app/requestedFoods", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        id,
        userEmail: user.email,
        requestDate: currentDate2,
        notes: requestNote,
      }),
    })
      .then((res) => res.json())
      .then((addResponse) => {
        if (addResponse.insertedId) {
          fetch(`https://food-bridge-server-hazel.vercel.app/foods/${id}`, {
            method: "DELETE",
            headers: {
              "content-type": "application/json",
            },
          })
            .then((res) => res.json())
            .then((deleteResponse) => {
              if (deleteResponse.deletedCount > 0) {
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
                  title: "Food successfully requested",
                });
                navigate("/myFoodRequest");
              }
            });
        }
      })
      .catch((error) => {
        console.error("Error handling food request:", error);
      });
  };

  return (
    <button
      className="bg-purple-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded"
      onClick={handleRequestModal}
    >
      Request Food
    </button>
  );
};

export default RequestFood;
