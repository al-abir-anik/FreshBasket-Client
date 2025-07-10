import { useContext, useEffect, useState } from "react";
import { assets } from "../../assets/assets";
import { MdDeleteOutline } from "react-icons/md";
import axios from "axios";
import { Link } from "react-router-dom";
import CheckoutForm from "./CheckoutForm";
import AuthContext from "../../auth/AuthContext";
import toast from "react-hot-toast";

const Cart = () => {
  const { user } = useContext(AuthContext);
  const [cartlist, setCartlist] = useState([]);
  const [qtyLoading, setQtyLoading] = useState({});

  useEffect(() => {
    fetch(`http://localhost:3000/user-cartlist?email=${user?.email}`)
      .then((res) => res.json())
      .then((data) => {
        setCartlist(data);
      })
      .catch((error) => {
        console.log(error.message);
      });
  }, [user]);

  const handleQuantity = async (id, currentQty, type) => {
    setQtyLoading((prev) => ({
      ...prev,
      [id]: { ...(prev[id] || {}), [type]: true },
    }));
    const updateQty =
      type === "increase" ? currentQty + 1 : Math.max(currentQty - 1, 1);

    const res = await axios.patch(
      `http://localhost:3000/update-cart-quantity`,
      {
        email: user?.email,
        productId: id,
        quantity: updateQty,
      }
    );

    if (res.data.modifiedCount > 0) {
      const updated = await fetch(
        `http://localhost:3000/user-cartlist?email=${user?.email}`
      );
      const newData = await updated.json();
      setCartlist(newData);
      toast.success('Quantity Updated');
    } else {
      console.error("Update quantity failed");
      toast.error('Quantity update failed');
    }
    setQtyLoading((prev) => ({
      ...prev,
      [id]: { increase: false, decrease: false },
    }));
  };

  const handleDeleteCartProduct = async (id) => {
    const res = await axios.patch(`http://localhost:3000/delete-cart-product`, {
      email: user?.email,
      productId: id,
    });

    if (res.data.modifiedCount > 0) {
      const updated = await fetch(
        `http://localhost:3000/user-cartlist?email=${user?.email}`
      );
      const newData = await updated.json();
      setCartlist(newData);
      toast.success('Removed from cart!');
    } else {
      console.error("product delete from cart failed");
    }
  };

  return (
    <div className="w-11/12 sm:w-10/12 mx-auto py-6 lg:py-16 flex flex-col lg:flex-row justify-around">
      <div className="flex-1 max-w-4xl">
        <h1 className="text-2xl md:text-3xl font-medium mb-10">
          Shopping Cart{" "}
          <span className="text-sm text-primary pl-3">
            {cartlist.length} Items
          </span>
        </h1>

        {/* Cart table Header */}
        <div className="grid grid-cols-[2fr_1fr_1fr] text-gray-500 text-base font-medium">
          <p className="text-left">Product Details</p>
          <p className="text-center">Subtotal</p>
          <p className="text-center">Action</p>
        </div>

        {/* Cart product details */}
        {cartlist.length === 0 ? (
          <p className="min-h-60 md:min-h-80 grid place-items-center text-lg font-medium text-black">
            Your cart is empty!
          </p>
        ) : (
          cartlist.map((product, index) => (
            <div
              key={index}
              className="grid grid-cols-[2fr_1fr_1fr] text-gray-500 items-center text-sm md:text-base font-medium pt-6"
            >
              {/* details column */}
              <div className="flex md:gap-6 gap-3">
                <div className="w-18 h-18 sm:w-20 sm:h-20 lg:w-24 lg:h-24 flex items-center justify-center border border-gray-300 rounded overflow-hidden cursor-pointer">
                  <img
                    className="max-w-full h-full object-cover"
                    src={product.image}
                    alt={product.name}
                  />
                </div>
                <div className="space-y-1">
                  <p className="text-base lg:text-lg font-semibold">
                    {product.name}
                  </p>
                  <div className="font-normal text-gray-500/70">
                    <p>
                      Price: $<span>{product.offerPrice || "N/A"}</span>
                    </p>
                    {/* handle quantity */}
                    <div className="flex flex-col md:flex-row  md:items-center gap-2 mt-2">
                      <p className="hidden md:block">Qty:</p>
                      <div className="flex items-center justify-center px-1 gap-2 bg-primary/10 rounded select-none">
                        <button
                          onClick={() =>
                            handleQuantity(
                              product._id,
                              product.quantity,
                              "decrease"
                            )
                          }
                          className="w-5 h-full text-md px-1 outline-none cursor-pointer"
                        >
                          {qtyLoading?.[product._id]?.decrease ? (
                            <div className="w-3 h-3 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
                          ) : (
                            "-"
                          )}
                        </button>
                        <span className="w-5 text-center">
                          {product.quantity}
                        </span>
                        <button
                          onClick={() =>
                            handleQuantity(
                              product._id,
                              product.quantity,
                              "increase"
                            )
                          }
                          className="w-5 h-full text-md px-1 outline-none cursor-pointer "
                        >
                          {qtyLoading?.[product._id]?.increase ? (
                            <div className="w-3 h-3 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
                          ) : (
                            "+"
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* subtotal column */}
              <p className="text-center">
                ${product.offerPrice * product.quantity}
              </p>
              {/* action column */}
              <button
                onClick={() => handleDeleteCartProduct(product._id)}
                className="mx-auto p-1.5 border border-red-300 hover:bg-red-50 rounded-full cursor-pointer "
              >
                <MdDeleteOutline className="text-xl text-red-400" />
              </button>
            </div>
          ))
        )}

        <Link
          to={"/all-products"}
          className="w-fit h-8 group cursor-pointer flex items-center mt-10 gap-2 text-primary font-medium"
        >
          <img
            src={assets.black_arrow_icon}
            alt="arrow"
            className="transition group-hover:-translate-x-1 rotate-180"
          />
          Continue Shopping
        </Link>
      </div>

      {/* --- Checkout Form ---  */}
      <CheckoutForm cartlist={cartlist} />
    </div>
  );
};

export default Cart;
