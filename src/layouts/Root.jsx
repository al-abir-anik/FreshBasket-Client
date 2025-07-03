import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Root = () => {
  const isSellerPath = useLocation().pathname.includes("seller");

  return (
    <div className="flex flex-col min-h-screen">
      {/* {isSellerPath ? null : <Navbar />} */}
      <Navbar />

      <div className="flex flex-col flex-grow">
        <Outlet />
      </div>

      <Footer />
    </div>
  );
};

export default Root;
