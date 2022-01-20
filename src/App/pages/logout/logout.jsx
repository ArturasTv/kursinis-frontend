import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Navigate } from "react-router";
import { logout } from "../../redux/actions/authAction";

const Logout = () => {
  const dispatch = useDispatch();
  const logOut = () => {
    dispatch(logout());
  };

  useEffect(() => {
    logOut();
  }, []);

  return <Navigate to="/" />;
};

export default Logout;
