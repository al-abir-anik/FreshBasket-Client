import AdminLogin from "../components/admin/AdminLogin";
import { useAdminContext } from "../contexts/AdminContext";

const AdminRoute = ({ children }) => {
  const { isAdmin } = useAdminContext();

  if (isAdmin) {
    return children;
  }

  return <AdminLogin />;
};

export default AdminRoute;
