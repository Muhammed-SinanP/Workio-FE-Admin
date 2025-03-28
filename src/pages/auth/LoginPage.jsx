import React, { useEffect } from "react";
import { axiosInstance } from "../../config/axiosInstance";
const googleIcon = "/googleIcon.png";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { clearUserData, saveUserData } from "../../redux/features/userSlice";
import LoginForm from "../../components/forms/LoginForm";

const LoginPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  function googleSignIn() {
    window.location.href = `${import.meta.env.VITE_BACKEND_URL
      }/api/auth/googleSign/admin`;
  }

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
      dispatch(clearUserData())
    }
  }

  useEffect(() => {
    checkUser();
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="main-div flex flex-col items-center">
      
      <div className="my-4 text-2xl font-brand-font text-brand">
        Welcome back, Admin!
      </div>

      <div className="mx-auto w-80 rounded-lg bg-white px-6 md:px-8 py-4 tracking-wide shadow-md dark:bg-dark">
        <div className="mb-4 text-center text-xl font-semibold sm:text-2xl dark:text-dark-text">
          Login
        </div>

        <div className="border-custom-border-color my-3 mt-4 w-full border-b-0.5"></div>

        <div className="flex w-full items-center justify-center">
          <button
            onClick={googleSignIn}
            className="btn btn-outline btn-md my-1 flex w-full items-center justify-center gap-2 border-brand text-brand dark:text-brand-light hover:border-brand hover:bg-brand hover:text-white"
          >
            <img src={googleIcon} alt="google icon" className="h-4" />
            <span className="text-base">Continue with Google</span>
          </button>
        </div>

        <div className="my-2 mb-3 flex w-full items-center justify-center">
          <div className="border-custom-border-color w-full border-b-0.5"></div>
          <div className="px-2 text-xs text-gray-400">or</div>
          <div className="border-custom-border-color w-full border-b-0.5"></div>
        </div>

        <LoginForm/>

      </div>

    </div>
  );
};

export default LoginPage;
