import React, { useContext } from "react";
import { AuthProvider } from "../context/AuthContext";
import NoAuthNav from "./NoAuthNav";
import AuthNav from "./AuthNav";

const Nav = () => {
  const { isLoging } = useContext(AuthProvider);
  return isLoging ? <AuthNav /> : <NoAuthNav />;
};

export default Nav;
