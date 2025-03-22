import React, { useEffect, useState } from "react";

import { axiosInstance } from "../config/axiosInstance";
import googleIcon from "../assets/googleIcon.png";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { clearUserData, saveUserData } from "../redux/features/userSlice";
import Header from "../components/Header";
import toast from "react-hot-toast";

const LoginPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    userEmail: "",
    userPassword: "",
  });
  function handleChange(e) {
    const { name, value } = e.target;
    console.log(name, value);
    console.log(formData);

    setFormData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const response = await axiosInstance({
        method: "POST",
        url: "/auth/login/admin",
        data: formData,
      });
      if (response.status === 200) {
        dispatch(saveUserData());
        toast.success("Login success");
        navigate("/");
      }else{
        console.log("response")
      }
    } catch (err) {
      dispatch(clearUserData());

      if (err.status == 404) {
        toast.error("User does not exists.");
      } else if (err.status === 401) {
        toast.error("Incorrect password");
      } else {
        console.error("Error during sign:", err.response?.data?.message || err);
      }
    }
  }

  function googleSignIn() {
    console.log("google start")
    try {
      
      window.location.href = `${
        import.meta.env.VITE_BACKEND_URL
      }/api/auth/googleSign/admin`;
    } catch (err) {
      console.log(err);
    }
  }
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const dispatch = useDispatch();
  const location = useLocation();
  async function checkUser() {
    try {
      const response = await axiosInstance({
        method: "GET",
        url: "/auth/checkUser",
      });
      if (response.status === 200) {
        dispatch(saveUserData());
        navigate("/");
      } else {
        dispatch(clearUserData());
        navigate("/login")
      }
    } catch (err) {
      console.log(err?.response?.data?.message || "user not authorized");

      dispatch(clearUserData());
    }
  }

  useEffect(() => {
    checkUser();
  }, [location.pathname]);
  return (
    <div className="min-h-screen pb-6 flex flex-col items-center">
      <Header />
      <div className="mt-2">
        <div className="text-center mb-3 text-2xl font-serif">
          Welcome back, Admin!
        </div>
        <div className="rounded-md shadow-md border p-4 dark:bg-darkColor-input dark:border-none">
          <div className="text-center font-medium -mt-2 mb-2">Login</div>
          <div className="text-center">
            <button
              onClick={googleSignIn}
              className="btn btn-outline btn-sm w-full border-0.5 text-sm dark:border-darkColor-light dark:bg-darkColor-light hover:bg-brandColor hover:border-brandColor"
            >
              <img src={googleIcon} alt="google icon" className="h-4" />
              Continue with google
            </button>
          </div>
          <div className="flex items-center my-2">
            <div className="border-b-0.5  flex-1"></div>
            <div className="px-2.5 text-gray-400">or</div>
            <div className="border-b-0.5 flex-1"></div>
          </div>
          <form onSubmit={handleSubmit} className="flex flex-col text-sm ">
            <label htmlFor="userEmail" className="">
              Email
            </label>
            <input
              type="email"
              name="userEmail"
              id="userEmail"
              className="dark:border-0.5 border focus:outline-none p-1 rounded-md"
              value={formData.userEmail}
              onChange={handleChange}
            />
            <label htmlFor="userPassword" className="mt-2">
              Password
            </label>
            <input
              type="password"
              name="userPassword"
              id="userPassword"
              className="dark:border-0.5 border focus:outline-none p-1 rounded-md"
              value={formData.userPassword}
              onChange={handleChange}
            />
            <div className="text-end text-xs mt-1">
              <span
                className="cursor-pointer text-blue-500 hover:text-blue-600"
                onClick={() => navigate("/forgotPassword")}
              >
                forgot password?
              </span>
            </div>
            <input
              type="submit"
              value="Login"
              className="btn btn-sm mt-4 bg-brandColor text-gray-100 hover:bg-brandColor-dark"
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
