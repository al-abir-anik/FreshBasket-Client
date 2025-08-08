import { useContext, useState } from "react";
import { useAppContext } from "../../contexts/AppContext";
import { useForm } from "react-hook-form";
import axios from "axios";
import AuthContext from "../../auth/AuthContext";
import toast from "react-hot-toast";

const OrderForm = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const { user } = useContext(AuthContext);
  const { userInfo } = useAppContext();
  const { cartItems, setCartItems, setShowCheckoutModal } = useAppContext();
  const [orderBtnLoading, setOrderBtnLoading] = useState(false);

  // order amount calculation
  const subtotal = cartItems.reduce((total, product) => {
    return total + product.offerPrice * product.quantity;
  }, 0);
  const shippingFee = 0;
  const tax = parseFloat((subtotal * 0.02).toFixed(2));
  const totalAmount = subtotal + shippingFee + tax;

  const handlePlaceOrder = async (data) => {
    setOrderBtnLoading(true);
    const { phoneNumber, address, payment } = data;

    try {
      // check cart length
      if (!cartItems || cartItems.length === 0) {
        toast.error("Cart is Empty!");
        return;
      }
      // send order info to backend
      const res = await axios.post(`https://freshbasket-server-seven.vercel.app/place-order`, {
        email: user?.email,
        userName: user?.displayName,
        phoneNumber,
        address,
        paymentMethod: payment,
        totalPrice: totalAmount,
      });
      // check the response and update cartitems
      if (res.data.success) {
        const updated = await fetch(
          `https://freshbasket-server-seven.vercel.app/user-cart-items?email=${user?.email}`
        );
        const newData = await updated.json();
        setCartItems(newData);
        toast.success("Order Placed Successfully.");
      } else {
        toast.error("Order Failed!");
      }
    } catch (error) {
      toast.error("Something went wrong");
      console.error("Order Failed:", error);
    } finally {
      setOrderBtnLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(handlePlaceOrder)}
      className="max-w-sm w-full h-fit text-black/90 bg-gray-100/40 p-5 mt-12 sm:mt-16 border border-gray-300/70 sticky top-0"
    >
      <h2 className="text-xl md:text-xl font-medium">Order Summary</h2>
      <hr className="border-gray-300 my-5" />

      <div className="space-y-3">
        {/* phone number */}
        <div className="w-full  space-y-1">
          <p className="text-sm font-medium uppercase">Phone Number</p>
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
            className="w-full p-2 bg-white border border-gray-200 rounded outline-primary"
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
        <div className="w-full space-y-1">
          <p className="text-sm font-medium uppercase">Delivery Address</p>
          <textarea
            {...register("address", {
              minLength: {
                value: 5,
                message: "add a proper address",
              },
            })}
            rows={2}
            className="w-full p-2 bg-white rounded border border-gray-200 resize-none outline-primary"
            placeholder="enter delivery address"
            defaultValue={userInfo.address}
            required
          ></textarea>
          {errors.address && (
            <p className="text-red-400">{errors.address.message}</p>
          )}
        </div>

        {/* payment metod */}
        <div className="w-full space-y-1">
          <p className="text-sm font-medium uppercase">Payment Method</p>
          <select
            {...register("payment")}
            className="w-full p-2 border border-gray-200 bg-white outline-primary"
          >
            <option value="COD">Cash On Delivery</option>
            <option value="Online">Online Payment</option>
          </select>
          {errors.payment && (
            <p className="text-red-500">{errors.payment.message}</p>
          )}
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

      <button
        // onClick={() => setShowCheckoutModal(true)}
        // type="button"
        disabled={orderBtnLoading}
        className="w-full h-12 mt-6 bg-primary text-white rounded font-medium hover:bg-primary-dull cursor-pointer"
      >
        {orderBtnLoading ? (
          <div className="w-5 h-5 mx-auto border-2 border-white border-t-transparent rounded-full animate-spin"></div>
        ) : (
          "Place Order"
        )}
      </button>
    </form>
  );
};

export default OrderForm;
