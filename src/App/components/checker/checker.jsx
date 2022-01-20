import React from "react";
import { Navigate } from "react-router";
import { useSelector } from "react-redux";
import { useLocation } from "react-router";
const Checker = () => {
  const location = useLocation();
  const { gameStarted } = useSelector((state) => state.WS);

  if (gameStarted && location.pathname != "/play")
    return <Navigate to="/play" />;
  return null;
};

export default Checker;
