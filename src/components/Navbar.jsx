import { useContext, useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import AuthContext from "../auth/AuthContext";
import { useAppContext } from "../contexts/AppContext";
import { assets } from "../assets/assets";
import { RiMenu3Fill } from "react-icons/ri";
import { LuUser } from "react-icons/lu";
import { LuLogOut } from "react-icons/lu";
import { PiShoppingCartSimple } from "react-icons/pi";
import toast from "react-hot-toast";
import Search from "./Search";

const Navbar = ({ setShowRegisterForm, setShowProfileModal }) => {
  const navigate = useNavigate();
  const { user, signOutUser } = useContext(AuthContext);
  const { cartItems, search } = useAppContext();
  const [open, setOpen] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const handleSignOut = () => {
    signOutUser()
      .then(() => {
        navigate("/");
        toast.success("Logout Successful");
      })
      .catch((error) => console.log("ERROR", error.message));
  };

  useEffect(() => {
    if (search.length > 0) {
      navigate("/all-products");
    }
  }, [search, navigate]);

  return (
    <nav className="w-11/12 mx-auto py-4 flex items-center justify-between bg-white relative transition-all">
      <Link to="/">
        {/* <img className="h-9" src={assets.logo} alt="logo" /> */}
        <p className="text-2xl font-black text-primary">
          <span className="text-3xl">F</span>RESH
          <span className="text-black">BASKET</span>
        </p>
      </Link>

      {/* Desktop Menu */}
      <div className="hidden sm:flex items-center gap-8">
        {user && (
          <NavLink
            to={"/admin"}
            className="py-1 px-3 text-xs border border-gray-300 rounded-full"
          >
            Admin Dashboard
          </NavLink>
        )}
        <NavLink
          to={"/"}
          className={({ isActive }) =>
            isActive ? "text-primary font-medium" : ""
          }
          viewTransition
        >
          Home
        </NavLink>
        <NavLink
          to={"/all-products"}
          className={({ isActive }) =>
            isActive ? "text-primary font-medium" : ""
          }
          viewTransition
        >
          All Products
        </NavLink>
        {user && (
          <NavLink
            to={"/my-orders"}
            className={({ isActive }) =>
              isActive ? "text-primary font-medium" : ""
            }
            viewTransition
          >
            My Orders
          </NavLink>
        )}

        {/* Search */}
        <Search />

        {/* Cart link */}
        <NavLink
          to={"/cart"}
          viewTransition
          className="w-10 relative cursor-pointer"
        >
          <PiShoppingCartSimple className="text-2xl mx-auto opacity-80" />
          <button className="absolute -top-2 -right-2 text-xs text-white bg-primary w-[18px] h-[18px] rounded-full">
            {cartItems.length}
          </button>
        </NavLink>

        {/* login and user */}
        {user ? (
          <div className="relative group">
            <img
              src={assets.profile_icon || user.photoURL}
              alt="profile-image"
              className="w-10"
            />
            <ul className="w-36 py-2.5 hidden group-hover:block absolute top-10 right-0 bg-white shadow border border-gray-200 rounded-md z-40">
              <li
                onClick={() => setShowProfileModal(true)}
                className="p-1.5 pl-5 hover:bg-primary/10 flex items-center gap-3 cursor-pointer"
              >
                <LuUser /> Profile
              </li>
              <li
                onClick={() => setShowLogoutModal(true)}
                className="p-1.5 pl-5 text-red-400 hover:bg-red-50/90 flex items-center gap-3 cursor-pointer"
              >
                <LuLogOut /> Logout
              </li>
            </ul>
          </div>
        ) : (
          <div className="space-x-6">
            <button
              onClick={() => setShowRegisterForm(true)}
              className="cursor-pointer px-8 py-2 bg-primary hover:bg-primary-dull transition text-white rounded-full"
            >
              Login
            </button>
          </div>
        )}
        {/* logout modal */}
        {showLogoutModal && (
          <div
            onMouseLeave={() => setShowLogoutModal(false)}
            className="py-6 px-5 flex flex-col items-center bg-white border border-gray-200 rounded-xl shadow fixed top-16 right-19 z-99"
          >
            <span className="mx-auto p-3 bg-red-100 rounded-full">
              <LuLogOut className="text-xl text-red-500" />
            </span>
            <p className="text-gray-600 my-3 text-center">
              Do you really want to logout?
            </p>

            <div className="flex items-center justify-center gap-4 mt-3 w-full">
              <button
                onClick={() => setShowLogoutModal(false)}
                className="w-full md:w-28 h-10 rounded-md border border-gray-300 bg-white text-gray-600 font-medium text-sm hover:bg-gray-100 active:scale-95 transition cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleSignOut}
                className="w-full md:w-28 h-10 rounded-md text-white bg-red-600 font-medium text-sm hover:bg-red-700 active:scale-95 transition cursor-pointer"
              >
                Logout
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Menu Icon for small screen */}
      <button
        onClick={() => (open ? setOpen(false) : setOpen(true))}
        aria-label="Menu"
        className="sm:hidden"
      >
        <RiMenu3Fill className="text-2xl" />
      </button>

      {/* Mobile Menu */}
      <div
        className={`${
          open ? "flex" : "hidden"
        } absolute top-[60px] left-0 w-full bg-white shadow-md py-4 flex-col items-center gap-2 px-5 text-sm md:hidden`}
      >
        <NavLink to={"/"} onClick={() => setOpen(false)} className="block">
          Home
        </NavLink>
        <NavLink
          to={"/all-products"}
          onClick={() => setOpen(false)}
          className="block"
        >
          All Products
        </NavLink>
        {user && (
          <NavLink to={"/"} onClick={() => setOpen(false)} className="block">
            My Orders
          </NavLink>
        )}

        {user ? (
          <button className="cursor-pointer transition text-red-400 rounded-full text-sm">
            Logout
          </button>
        ) : (
          <div className="space-x-6">
            <button
              onClick={() => setShowRegisterForm(true)}
              className="cursor-pointer px-6 py-2 mt-2 bg-primary hover:bg-primary-dull transition text-white rounded-full text-sm"
            >
              Login
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
