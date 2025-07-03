import { useContext } from "react";
import { useLoaderData } from "react-router-dom";
import AuthContext from "../../auth/AuthContext";
import RequestFood from "./RequestFood";

const FoodDetails = () => {
  const { user } = useContext(AuthContext);
  const specificFood = useLoaderData();
  const {
    _id,
    foodName,
    imageUrl,
    quantity,
    location,
    expireDate,
    status,
    notes,
  } = specificFood;

  return (
    <section className="my-20">
      <div className="w-full h-96 py-8 bg-[#9538e2] text-center space-y-3">
        <h2 className="font-bold text-3xl text-white">Food Details</h2>
        <p className="w-1/2 text-center mx-auto font-normal text-base text-white">
          Food Details provide essential information about each food item,
          including its ingredients, nutritional values, expiration date, and
          dietary considerations, helping users make informed food choices. It
          also offers insights into portion sizes and potential allergens.
        </p>
      </div>
      <div className="w-full h-96 bg-[#f6f6f6] relative">
        <div className="w-3/4 h-fit mx-auto p-10 rounded-3xl bg-white flex gap-10 absolute inset-0 m-auto -top-72">
          <div className="w-2/5">
            <img src={imageUrl} className=" rounded-2xl" />
          </div>
          <div className="space-y-3">
            <h2 className="font-semibold text-2xl text-[#09080f]">
              {foodName}
            </h2>
            <p className="font-normal text-base text-[#09080f]/60">
              Quantity : {quantity}
            </p>
            <p className="font-bold text-xl text-[#09080f]/80">
              Expiration Date : {expireDate}
            </p>
            <p className="font-semibold text-xl text-[#09080f]/80">
              Food Status : {status}
            </p>
            <p className="font-semibold text-xl text-[#09080f]/80">
              Location : {location}
            </p>
            <p className="font-normal text-base text-[#09080f]/60">{notes}</p>

            <div className="space-x-3">
              {/* <button
                // onClick={handleRequestFood}
                className="btn bg-[#9538e2] rounded-full text-white font-semibold text-lg px-10"
              >
                Request Food
              </button> */}
              <RequestFood foodDetails={specificFood} user={user}></RequestFood>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FoodDetails;
