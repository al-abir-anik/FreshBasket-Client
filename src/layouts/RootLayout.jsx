import { Outlet} from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Register from "../components/Register";
import { useState } from "react";

const RootLayout = () => {
  const [showRegisterForm, setShowRegisterForm] = useState(false);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar setShowRegisterForm={setShowRegisterForm} />
      <main className="flex-grow">
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

export default RootLayout;
