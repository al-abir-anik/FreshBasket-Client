import { Link, NavLink, Outlet } from "react-router-dom";
import { assets } from "../assets/assets";
import { useAdminContext } from "../contexts/AdminContext";

const AdminLayout = () => {
  const { setIsAdmin } = useAdminContext();

  const handleAdminLogout = () => {
    setIsAdmin(false);
  };

  const sidebarLinks = [
    { name: "Add Product", path: "/admin", icon: assets.add_icon },
    {
      name: "Product List",
      path: "/admin/product-list",
      icon: assets.product_list_icon,
    },
    { name: "Orders", path: "/admin/orders", icon: assets.order_icon },
  ];

  return (
    <>
      <nav className="w-full px-10 mx-auto py-4 flex items-center justify-between bg-white">
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

      <div className="w-full flex min-h-screen">
        <aside className="w-16 md:w-1/6 pt-6 border-r border-gray-300 flex flex-col">
          {sidebarLinks.map((item) => (
            <NavLink
              to={item.path}
              key={item.name}
              end={item.path === "/admin"}
              className={({ isActive }) => `flex items-center py-3 px-8 gap-4 
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

        <main className="w-full">
          <Outlet />
        </main>
      </div>
    </>
  );
};

export default AdminLayout;
