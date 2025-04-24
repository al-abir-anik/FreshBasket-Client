import { useContext } from "react";
import { Link, NavLink, Outlet } from "react-router-dom";
import AuthContext from "../contexts/AuthContext/AuthContext";

const Dashboard = () => {
  const { user, loading } = useContext(AuthContext);

  if (loading || !user) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <span className="loading loading-bars loading-lg"></span>
      </div>
    );
  }

  return (
    <div className="flex">
      {/* Sidebar */}
      <aside className="menu md:w-1/6 bg-lime-200 p-8 shadow-sm rounded-none">
        <div className="drawer-header">
          <Link to={"/"}>
            <div className="flex items-center gap-3">
              <h3 className="drawer-title text-xl font-semibold">FoodBridge</h3>
            </div>
          </Link>
        </div>

        <ul className="text-gray-600 space-y-2 mt-10 uppercase text-lg">
          <li>
            <NavLink to={"userProfile"}>User Profile</NavLink>
          </li>
          <li>
            <NavLink to={"manageProfile"}>Manage Profile</NavLink>
          </li>
          <li>
            <Link to={"/"}>Back To Home</Link>
          </li>

          <div className="divider text-base-content/50 py-6 after:border-0">
            Account
          </div>
          <li>
            <a href="#">
              <span className="icon-[tabler--logout-2] size-5"></span>
              Sign Out
            </a>
          </li>
        </ul>
      </aside>

      {/* Main Content */}

      <div className="flex flex-col md:w-5/6 min-h-screen">
        {/* <Navbar></Navbar> */}
        <main className="flex flex-col flex-grow">
          <Outlet></Outlet>
        </main>
        <footer className="bg-[#2A3042] text-white py-4 text-center">
          <p>&copy; 2025 FoodBridge. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
};

export default Dashboard;
