import { useContext } from "react";
import AuthContext from "../auth/AuthContext";
import { Navigate } from "react-router-dom";

const LockRoute = ({ children }) => {
  const { user } = useContext(AuthContext);

  if (!user) {
    return children;
  }

  return <Navigate to={"/"}></Navigate>;
};

export default LockRoute;
