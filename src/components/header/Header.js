import React from "react";
import "./Header.css";
import UserLoggedOut from "./UserLoggedOut";
import UserLoggedIn from "./UserLoggedIn";
import useAuthContext from "../../context/auth_context/AuthContext";

const Header = () => {
  const { user } = useAuthContext();

  return <>{user ? <UserLoggedIn /> : <UserLoggedOut />}</>;
};

export default Header;
