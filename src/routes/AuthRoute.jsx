import { useContext } from "react";
import AuthContext from "../auth/AuthContext";
import { Navigate } from "react-router-dom";

const AuthRoute = ({ children }) => {
  const { user } = useContext(AuthContext);

  if (!user) {
    return children;
  }

  return <Navigate to={"/"}></Navigate>;
};

export default AuthRoute;
