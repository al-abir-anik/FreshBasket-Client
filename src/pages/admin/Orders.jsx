import { useEffect, useState } from "react";
import { assets } from "../../assets/assets";

const Orders = () => {
  const [allOrders, setAllOrders] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:3000/all-orders`)
      .then((res) => res.json())
      .then((data) => {
        setAllOrders(data);
      })
      .catch((error) => {
        console.log(error.message);
      });
  }, []);

  return (
    <div className="w-10/12 space-y-5">
      <h2 className="text-lg font-medium">
        Orders List <span className="ml-1">({allOrders.length})</span>
      </h2>
      {allOrders.map((order, index) => (
        <div
          key={index}
          className="flex flex-col md:grid md:grid-cols-[1fr_1fr_1fr] md:items-center gap-5 p-5 rounded-md border border-gray-300 text-gray-800"
        >
          <div className="flex items-center gap-5">
            <img
              className="object-cover opacity-60"
              src={assets.box_icon}
              alt="boxIcon"
            />

            <div className="flex flex-col justify-center gap-3">
              {order.items.map((item, index) => (
                <div key={index}>
                  <p className="font-medium">
                    {item.productName}{" "}
                    <span className={`text-primary `}>x {item.quantity}</span>
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="text-sm space-y-2">
            <p>{order.userName}</p>
            <p>{order.phoneNumber}</p>
            <p>{order.shippingAddress}</p>
          </div>

          <div className="flex flex-col text-sm space-y-1">
            <p>Amount: $ {order.totalPrice}</p>
            <p>Method: {order.paymentMethod}</p>
            <p>Date: {new Date(order.orderDate).toLocaleString("en-US")}</p>
            <p>Payment: {order.isPaid ? "Paid" : "Pending"}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Orders;
