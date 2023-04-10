import { useContext } from "react";
import { Outlet, Navigate } from "react-router-dom";
import { UserContext } from "../../contexts/UserContext";

export default function SignInRoot() {
  const { user } = useContext(UserContext);

  if (user) {
    return <Outlet />;
  } else {
    return <Navigate to="/signIn" />;
  }
}
