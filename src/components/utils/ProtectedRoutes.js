import React from "react";
import { useEffect } from "react";
import {Redirect, Outlet, Navigate, Route, useNavigate } from "react-router-dom";
import useAuthContext from "../../context/auth_context/AuthContext";


const ProtectedRoutes = (props) => {
  const {Component} = props
  // const { user, setUser } = useAuthContext();
// console.log(`protected Route`, user)
const navigate = useNavigate()

useEffect(() =>  {
 const userInLocalStorage = JSON.parse(localStorage.getItem("user"));
  if(!userInLocalStorage){
    navigate("/login")
  }
}, [])




  return (
  <div><Component /></div>
  ) 
};

export default ProtectedRoutes;
