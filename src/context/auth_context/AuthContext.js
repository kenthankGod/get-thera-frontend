import { useState, useEffect } from "react";
import { createContext, useContext } from "react";
import { toast } from "react-toastify";
import axios from "axios";
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState("");

  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const [success, setSuccess] = useState({});

  useEffect(() => {
    const userInLocalStorage = JSON.parse(localStorage.getItem("user"));

    if (userInLocalStorage) {
      setUser(userInLocalStorage);
    } 
  }, []);

  const signup = async (formData) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.post(
        `https://getthera-api.onrender.com/signup`,
        formData
      );

      if (response && response.data) {
        setIsLoading(false);
        setSuccess({ message: "success" });
        localStorage.setItem("user", JSON.stringify(response.data));
        setUser(response.data);
        setIsLoading(false);
      }
    } catch (error) {
      if (error && error.response) {
        setIsLoading(false);
        setError(error.response.data.message);
        setIsLoading(false);
      }

      if (error.message === "Request failed with status code 404") {
        toast.error("Network Error can't register at the moment!");
        setIsLoading(false);
      }
    }
  };

  const login = async (formData) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.post(
        `https://getthera-api.onrender.com/login`,
        formData
      );

      if (response && response.data) {
        setIsLoading(false);
        setSuccess({ message: "success" });
        localStorage.setItem("user", JSON.stringify(response.data));
        setUser(response.data);
        setIsLoading(false);
      }
    } catch (error) {
      if (error && error.response) {
        setIsLoading(false);
        setError(error.response.data.message);
        setIsLoading(false);
      }

      if (error.message === "Request failed with status code 404") {
        toast.error("Network Error can't register at the moment!");
        setIsLoading(false);
      }
    }
  };

  const logOut = () => {
    setUser("");
    localStorage.removeItem("user");
    window.location.href = "/";
  };

  const value = {
    signup,
    login,
    logOut,
    isLoading,
    error,
    success,
    user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

const useAuthContext = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuthContext must be used within AuthProvider");
  }

  return context;
};
export default useAuthContext;
