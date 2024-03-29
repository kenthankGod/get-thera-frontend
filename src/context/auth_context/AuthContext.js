import { useState, useEffect } from "react";
import { createContext, useContext } from "react";
import { toast } from "react-toastify";
import axios from "axios";
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState("");
  const [isLoading, setIsLoading] = useState(null);

  useEffect(() => {
    const userInLocalStorage = JSON.parse(localStorage.getItem("user"));

    if (userInLocalStorage) {
      setUser(userInLocalStorage);
    }
  }, []);

  const signup = async (formData) => {
    setIsLoading(true);

    try {
      const response = await axios.post(
        `https://gethera-app-api.onrender.com/signup`,
        formData
      );

      if (response && response.data) {
        setIsLoading(false);
        toast.success("Singup Successful!");
        localStorage.setItem("user", JSON.stringify(response.data));
        setUser(response.data);
        setIsLoading(false);
      }
    } catch (error) {
      if (error && error.response) {
        setIsLoading(false);
        toast.error(error.response.data.message);
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

    try {
      const response = await axios.post(
        // `https://gethera-app-api.onrender.com/login`,
        `https://gethera-app-api.onrender.com/login`,
        formData
      );

      if (response && response.data) {
        setIsLoading(false);
        toast.success("Logged in!");
        localStorage.setItem("user", JSON.stringify(response.data));
        setUser(response.data);
        setIsLoading(false);
      }
    } catch (error) {
      if (error && error.response) {
        setIsLoading(false);
        toast.error(error.response.data.message);
        setIsLoading(false);
      }

      if (error.message === "Request failed with status code 404") {
        toast.error("Network Error can't login at the moment!");
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
