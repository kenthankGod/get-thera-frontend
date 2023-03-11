import React from "react";
import { useEffect } from "react";
import {useNavigate } from "react-router-dom";



const ProtectedRoutes = (props) => {
  const {Component} = props
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
