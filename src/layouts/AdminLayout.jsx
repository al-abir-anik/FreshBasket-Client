import { useContext } from "react";
import AuthContext from "../auth/AuthContext";
import AdminLogin from "../components/admin/AdminLogin";
import DashboardPage from "../pages/Dashboard/DashboardPage";
import { Link, NavLink, Outlet, useLocation } from "react-router-dom";
import { assets } from "../assets/assets";
import { useAdminContext } from "../contexts/AdminContext";

const AdminLayout = () => {
  const isAdminPath = useLocation().pathname.includes("admin");
  const { user, loading } = useContext(AuthContext);
  const { setIsAdmin } = useAdminContext();

  const handleAdminLogout = () => {
    setIsAdmin(false);
  };

  const sidebarLinks = [
    { name: "Add Product", path: "/seller", icon: assets.add_icon },
    {
      name: "Product List",
      path: "/seller/product-list",
      icon: assets.product_list_icon,
    },
    { name: "Orders", path: "/seller/orders", icon: assets.order_icon },
  ];

  return (
    <>
      <nav className="w-11/12 mx-auto py-4 flex items-center justify-between bg-white">
        <Link to="/">
          <img src={assets.logo} alt="logo" className="w-34 md:w-38" />
        </Link>
        <div className="flex items-center gap-5 text-gray-500">
          <p>Hi! Admin</p>
          <button
            onClick={handleAdminLogout}
            className="border rounded-full text-sm px-4 py-1"
          >
            Logout
          </button>
        </div>
      </nav>
      <hr className="w-full border-gray-300" />

      <div className="flex min-h-screen">
        <aside className="md:w-64 w-16 border-r h-[550px] text-base border-gray-300 pt-4 flex flex-col transition-all duration-300">
          {sidebarLinks.map((item) => (
            <NavLink
              to={item.path}
              key={item.name}
              // end={item.path === "/seller"}
              className={({ isActive }) => `flex items-center py-3 px-4 gap-3 
                            ${
                              isActive
                                ? "border-r-4 md:border-r-[6px] bg-primary/10 border-primary text-primary"
                                : "hover:bg-gray-100/90 border-white"
                            }`}
            >
              <img src={item.icon} alt="icon" className="w-7 h-7" />
              <p className="md:block hidden text-center">{item.name}</p>
            </NavLink>
          ))}
        </aside>

        <main className="">
          <Outlet />
        </main>
      </div>
    </>
  );
};

export default AdminLayout;
