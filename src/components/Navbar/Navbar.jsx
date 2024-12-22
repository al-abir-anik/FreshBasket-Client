import { Link, NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar justify-around h-24 bg-base-200">
      <div className="">
        {/* <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16" />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
              <li><a>Item 1</a></li>
              <li>
                <a>Parent</a>
                <ul className="p-2">
                  <li><a>Submenu 1</a></li>
                  <li><a>Submenu 2</a></li>
                </ul>
              </li>
              <li><a>Item 3</a></li>
            </ul>
          </div> */}
        <a className="btn btn-ghost text-xl">FoodBridge</a>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 space-x-2 text-[13px] font-semibold text-[#2D2A6E]">
          <li>
            <NavLink to={"/"}>HOME</NavLink>
          </li>
          <li>
            <NavLink to={"/availableFoods"}>AVAILABLE FOODS</NavLink>
          </li>
          <li>
            <NavLink to={"/addFood"}>ADD FOOD</NavLink>
          </li>
          <li>
            <NavLink to={"/manageMyFoods"}>MANAGE MY FOODS</NavLink>
          </li>
          <li>
            <NavLink to={"/myFoodRequest"}>MY FOOD REQUEST</NavLink>
          </li>
        </ul>
      </div>
      <div className="">
        <Link to={"/logIn"}>
          <button className="btn">LOG IN</button>
        </Link>
        <Link to={"/signUp"}>
          <button className="btn">SIGN UP</button>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
