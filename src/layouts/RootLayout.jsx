import { useState } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Register from "../components/Register";
import UserProfile from "../components/userProfile";
import Checkout from "../components/Checkout";
import { useAppContext } from "../contexts/AppContext";

const RootLayout = () => {
  const [showRegisterForm, setShowRegisterForm] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const { showCheckoutModal, setShowCheckoutModal } = useAppContext();

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar
        setShowRegisterForm={setShowRegisterForm}
        setShowProfileModal={setShowProfileModal}
      />
      <hr className="border-gray-300" />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />

      {/* Authentication Form Modal */}
      {showRegisterForm && (
        <Register setShowRegisterForm={setShowRegisterForm} />
      )}
      {/* User Profile Modal */}
      {showProfileModal && (
        <UserProfile setShowProfileModal={setShowProfileModal} />
      )}
      {/* Check Out Modal */}
      {showCheckoutModal && <Checkout />}
    </div>
  );
};

export default RootLayout;
