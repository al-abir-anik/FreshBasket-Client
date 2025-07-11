import { useState } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Register from "../components/Register";
import UserProfile from "../components/userProfile";

const RootLayout = () => {
  const [showRegisterForm, setShowRegisterForm] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);

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
    </div>
  );
};

export default RootLayout;
