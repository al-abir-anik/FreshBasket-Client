import { useEffect, useState } from "react";
import { useAdminContext } from "../../contexts/AdminContext";
import { useNavigate } from "react-router-dom";

const AdminLogin = () => {
  const { isAdmin, setIsAdmin } = useAdminContext();
  const navigate = useNavigate();
  const [email, setEmail] = useState("test@admin.com");
  const [password, setPassword] = useState("testxdjtjmtgmjk");

  const handleAdminLogin = async (event) => {
    event.preventDefault();
    await setIsAdmin(true);
  };

  useEffect(() => {
    if (isAdmin) {
      navigate("/admin");
    }
  }, [isAdmin, navigate]);

  return (
    <form
      onSubmit={handleAdminLogin}
      className="min-h-screen flex items-center text-sm text-gray-600"
    >
      <div className=" flex flex-col gap-5 m-auto items-start p-8 py-12 min-h-80 sm:min-w-96 rounded-lg shadow-xl border border-gray-200">
        <p className="text-2xl font-medium m-auto">
          <span className="text-primary">Admin</span> Login
        </p>
        <div className="w-full">
          <p>Email</p>
          <input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            placeholder="enter your email"
            className="w-full p-2 mt-1 border border-gray-200 rounded outline-primary"
            type="email"
            required
          />
        </div>
        <div className="w-full">
          <p>Password</p>
          <input
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            placeholder="enter your password"
            className="w-full p-2 mt-1 border border-gray-200 rounded outline-primary"
            type="password"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full py-2 bg-primary text-white rounded-md outline-none cursor-pointer"
        >
          Login
        </button>
      </div>
    </form>
  );
};

export default AdminLogin;
