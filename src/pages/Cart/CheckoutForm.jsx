import { useState } from "react";
import { CiDeliveryTruck } from "react-icons/ci";
import { BsTelephoneInbound } from "react-icons/bs";

const CheckoutForm = ({ cartItems }) => {
  const [showAddressInput, setShowAddressInput] = useState(false);

  const subtotal = cartItems.reduce((total, product) => {
    return total + product.offerPrice * product.quantity;
  }, 0);
  const shippingFee = 0;
  const tax = parseFloat((subtotal * 0.02).toFixed(2));
  const totalAmount = subtotal + shippingFee + tax;

    const deliveryAdrress = "Chowrasta";
    const phoneNumber = "012312312312";

  return (
    <div className="max-w-sm w-full h-fit bg-gray-100/40 p-5 mt-12 sm:mt-16 border border-gray-300/70 sticky top-0">
      <h2 className="text-xl md:text-xl font-medium">Order Summary</h2>
      <hr className="border-gray-300 my-5" />

      <div className="space-y-3">
        {/* phone number */}
        <div>
          <p className="text-sm font-medium uppercase">Mobile Number</p>
          <div className="flex justify-between items-start py-2">
            <p className="text-gray-500">{phoneNumber}</p>
            {/* <div className="w-3/4 py-1 bg-white rounded flex items-center text-sm gap-2 px-3">
              <input
                className="w-full py-2 bg-transparent text-gray-500 outline-none placeholder-gray-400"
                type="text"
                placeholder="Enter mobile number"
              />
              <BsTelephoneInbound className="opacity-50" />
            </div> */}
            <button className="text-primary cursor-pointer hover:underline">
              Change
            </button>
          </div>
        </div>

        {/* delivery address */}
        <div>
          <p className="text-sm font-medium uppercase">Delivery Address</p>
          <div className="relative flex justify-between items-start py-2">
            <p className="text-gray-500">{deliveryAdrress}</p>
            <button
              onClick={() => setShowAddressInput(!showAddressInput)}
              className="text-primary hover:underline cursor-pointer"
            >
              Change
            </button>
            {showAddressInput && (
              <div className="absolute top-12 py-1 bg-white border border-gray-300 text-sm w-full">
                <div className="flex items-center text-sm gap-2 px-3">
                  <input
                    className="w-full py-2 bg-transparent text-gray-500 outline-none placeholder-gray-400"
                    type="text"
                    placeholder="Enter delivery address"
                  />
                  <CiDeliveryTruck className="text-xl opacity-70" />
                </div>
                <p
                  onClick={() => setShowAddressInput(false)}
                  className="text-primary text-center cursor-pointer p-2 hover:bg-primary/10"
                >
                  Add address
                </p>
              </div>
            )}
          </div>
        </div>

        <div>
          <p className="text-sm font-medium uppercase">Payment Method</p>
          <select className="w-full border border-gray-300 bg-white px-3 py-2 mt-2 outline-none">
            <option value="COD">Cash On Delivery</option>
            <option value="Online">Online Payment</option>
          </select>
        </div>
      </div>

      <hr className="border-gray-300 my-5" />

      {/* total price */}
      <div className="text-gray-500 mt-4 space-y-2">
        <p className="flex justify-between">
          <span>Products Price</span>
          <span>$ {subtotal}</span>
        </p>
        <p className="flex justify-between">
          <span>Shipping Fee</span>
          <span className="text-green-600">{shippingFee === 0 && "Free"}</span>
        </p>
        <p className="flex justify-between">
          <span>Tax (2%)</span>
          <span>$ {tax}</span>
        </p>
        <p className="flex justify-between text-lg font-medium mt-3">
          <span>Total Amount:</span>
          <span>$ {totalAmount}</span>
        </p>
      </div>

      <button className="w-full py-3 mt-6 cursor-pointer bg-primary text-white font-medium hover:bg-primary-dull transition">
        Place Order
      </button>
    </div>
  );
};

export default CheckoutForm;
