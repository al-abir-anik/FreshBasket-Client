import { useContext, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import AuthContext from "../auth/AuthContext";
import { assets } from "../assets/assets";
import { LuSearch } from "react-icons/lu";
import { RiMenu3Fill } from "react-icons/ri";
import { PiShoppingCartSimple } from "react-icons/pi";

const Navbar = () => {
  const navigate = useNavigate();
  const { user, signOutUser } = useContext(AuthContext);
  const [open, setOpen] = useState(false);

  const handleSignOut = () => {
    signOutUser()
      .then(() => navigate("/logIn"))
      .catch((error) => console.log("ERROR", error.message));
  };

  return (
    <nav className="flex items-center justify-between px-6 md:px-16 lg:px-24 xl:px-32 py-4 border-b border-gray-300 bg-white relative transition-all">
      <Link to="/">
        <img className="h-9" src={assets.logo} alt="logo" />
      </Link>

      {/* Desktop Menu */}
      <div className="hidden sm:flex items-center gap-8">
        <NavLink to={"/"}>Home</NavLink>
        <NavLink to={"/all-products"}>All Products</NavLink>
        {user && <NavLink to={"/"}>My Orders</NavLink>}
        <NavLink to={""}>Contact</NavLink>

        <div className="hidden lg:flex items-center text-sm gap-2 border border-gray-300 px-3 rounded-full">
          <input
            className="py-1.5 w-full bg-transparent outline-none placeholder-gray-500"
            type="text"
            placeholder="Search products"
          />
          <LuSearch className="text-lg opacity-60" />
        </div>

        {/* Cart Icon */}
        <NavLink to={"/cart"} className="w-10 relative cursor-pointer">
          <PiShoppingCartSimple className="text-2xl mx-auto" />
          <button className="absolute -top-2 -right-2 text-xs text-white bg-primary w-[18px] h-[18px] rounded-full">
            3
          </button>
        </NavLink>

        {user ? (
          <div className="relative group">
            <img
              src={assets.profile_icon || user.photoURL}
              alt="profile-image"
              className="w-10"
            />
            <ul className="w-32 py-2.5 hidden group-hover:block absolute top-10 right-0 bg-white shadow border border-gray-200 rounded-md text-sm z-40">
              <li className="p-1.5 pl-5 hover:bg-primary/10 cursor-pointer">
                My Orders
              </li>
              <li
                className="p-1.5 pl-5 text-red-400 hover:bg-red-50 cursor-pointer"
                onClick={handleSignOut}
              >
                Logout
              </li>
            </ul>
          </div>
        ) : (
          <div className="space-x-6">
            <Link to={"/login"}>
              <button className="cursor-pointer px-8 py-2 bg-primary hover:bg-primary-dull transition text-white rounded-full">
                Login
              </button>
            </Link>
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
        <NavLink
          to={"/all-products"}
          onClick={() => setOpen(false)}
          className="block"
        >
          Contact
        </NavLink>

        {user ? (
          <button className="cursor-pointer transition text-red-400 rounded-full text-sm">
            Logout
          </button>
        ) : (
          <div className="space-x-6">
            <Link to={"/login"}>
              <button className="cursor-pointer px-6 py-2 mt-2 bg-primary hover:bg-primary-dull transition text-white rounded-full text-sm">
                Login
              </button>
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
