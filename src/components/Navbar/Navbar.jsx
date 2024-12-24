import { useContext } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import AuthContext from "../../contexts/AuthContext/AuthContext";

const Navbar = () => {
  const navigate = useNavigate();
  const { user, signOutUser } = useContext(AuthContext);

  const handleSignOut = () => {
    signOutUser()
      .then(() => navigate("/logIn"))
      .catch((error) => console.log("ERROR", error.message));
  };

  return (
    <nav className="navbar justify-around h-24 bg-base-200">
      <div className="">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
          >
            <li>
              <a>Item 1</a>
            </li>
            <li>
              <a>Parent</a>
              <ul className="p-2">
                <li>
                  <a>Submenu 1</a>
                </li>
                <li>
                  <a>Submenu 2</a>
                </li>
              </ul>
            </li>
            <li>
              <a>Item 3</a>
            </li>
          </ul>
        </div>
        <Link to={"/"} className="btn btn-ghost text-xl">
          FoodBridge
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 space-x-2 text-[13px] font-semibold text-[#2D2A6E]">
          <li>
            <NavLink to={"/"}>HOME</NavLink>
          </li>
          <li>
            <NavLink to={"/availableFoods"}>AVAILABLE FOODS</NavLink>
          </li>
          {user && (
            <li>
              <NavLink to={"/addFood"}>ADD FOOD</NavLink>
            </li>
          )}
          {user && (
            <li>
              <NavLink to={"/manageMyFoods"}>MANAGE MY FOODS</NavLink>
            </li>
          )}
          {user && (
            <li>
              <NavLink to={"/myFoodRequest"}>MY FOOD REQUEST</NavLink>
            </li>
          )}
        </ul>
      </div>
      <div className="space-x-5">
        {user ? (
          <button onClick={handleSignOut} className="btn">
            LOG OUT
          </button>
        ) : (
          <div className="space-x-6">
            <Link to={"/logIn"}>
              <button className="btn">LOG IN</button>
            </Link>
            <Link to={"/signUp"}>
              <button className="btn">SIGN UP</button>
            </Link>
          </div>
        )}

        {user && (
          <div className="dropdown dropdown-end">
            <div className="btn btn-ghost btn-circle avatar relative group">
              <div className="w-10 rounded-full">
                <img src={user.photoURL} />
              </div>

              {user && (
                <span className="absolute top-1/2 -translate-y-1/2 left-full ml-2 w-max bg-gray-800 text-white text-sm font-semibold py-2 px-3 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                  {user?.displayName}
                </span>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
