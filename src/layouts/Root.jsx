import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Register from "../components/Register";
import { useState } from "react";

const Root = () => {
  const isSellerPath = useLocation().pathname.includes("seller");
  const [showRegisterForm, setShowRegisterForm] = useState(false);

  return (
    <div className="flex flex-col min-h-screen">
      {/* {isSellerPath ? null : <Navbar />} */}
      <Navbar setShowRegisterForm={setShowRegisterForm} />
      <main className="flex flex-col flex-grow">
        <Outlet />
      </main>
      <Footer />

      {/* Authentication Form Modal */}
      {showRegisterForm && (
        <Register setShowRegisterForm={setShowRegisterForm} />
      )}
    </div>
  );
};

export default Root;
