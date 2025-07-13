import { useContext, useEffect, useState } from "react";
import AuthContext from "../auth/AuthContext";
import { useAppContext } from "../contexts/AppContext";

const MyOrders = () => {
  const { user } = useContext(AuthContext);
  const { fetchLoading, setFetchLoading } = useAppContext();
  const [myOrders, setMyOrders] = useState([]);

  useEffect(() => {
    setFetchLoading(true);
    fetch(`http://localhost:3000/user-orders?email=${user?.email}`)
      .then((res) => res.json())
      .then((data) => {
        setMyOrders(data);
        setFetchLoading(false);
      })
      .catch((error) => {
        console.log(error.message);
        setFetchLoading(false);
      });
  }, [user, setFetchLoading]);

  return (
    <div className="w-4/5 mx-auto mt-16 pb-8">
      <div className="flex flex-col items-end w-max mb-8">
        <p className="text-2xl font-medium uppercase">My Orders</p>
        <div className="w-16 h-0.5 bg-primary rounded-full"></div>
      </div>

      {fetchLoading ? (
        <div className="min-h-[60vh] flex items-center justify-center">
          <div className="loader"></div>
        </div>
      ) : myOrders.length === 0 ? (
        <p className="min-h-[60vh] text-center text-gray-400 text-lg flex items-center">
          You have no orders.
        </p>
      ) : (
        myOrders.map((order, index) => (
          <div
            key={index}
            className="w-4/5 border border-gray-300 rounded-lg mb-10 p-5"
          >
            <div className="flex px-4 justify-between md:items-center text-gray-400 md:font-medium max-md:flex-col">
              <span className="w-2/5">OrderId: {order.orderId}</span>
              <span className="w-1/4">Payment: {order.paymentMethod}</span>
              <span className="w-1/4 ">Total Amount: $ {order.totalPrice}</span>
            </div>
            {order.items.map((item, index) => (
              <div
                key={index}
                className={`w-full p-4 py-5  bg-white text-gray-500/80 border-gray-300 flex flex-col md:flex-row md:items-center justify-between ${
                  order.items.length !== index + 1 && "border-b"
                }`}
              >
                <div className="w-2/5 flex items-center mb-4 md:mb-0">
                  <div className="bg-primary/10 p-4 rounded-lg">
                    <img
                      src={item.product.image[0]}
                      alt=""
                      className="w-16 h-18"
                    />
                  </div>
                  <div className="ml-4 space-y-2">
                    <h2 className="text-xl font-medium text-gray-800">
                      {item.product.name}
                    </h2>
                    <p>Category: {item.product.category}</p>
                  </div>
                </div>

                <div className="w-1/4 mb-4 md:mb-0 flex flex-col justify-center">
                  <p>Quantity: {item.quantity}</p>
                  <p>Staus: {order.status}</p>
                  <p>Date: {new Date(order.orderDate).toLocaleDateString()}</p>
                </div>
                <p className="w-1/4 text-primary text-lg font-medium">
                  Amount: ${item.product.offerPrice}
                </p>
              </div>
            ))}
          </div>
        ))
      )}
    </div>
  );
};

export default MyOrders;
