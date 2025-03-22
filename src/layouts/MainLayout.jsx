import React, { useEffect } from 'react'

import Footer from '../components/Footer'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import Sidebar from '../components/Sidebar'
import { useDispatch, useSelector } from "react-redux";
import { axiosInstance } from "../config/axiosInstance";
import { clearUserData, saveUserData } from "../redux/features/userSlice";

const MainLayout = () => {
  const { initialized,userLoggedIn } = useSelector(state => state.user)
  const dispatch = useDispatch();
  const navigate = useNavigate()

  const location = useLocation();
  async function checkUser() {
    try {
      const response = await axiosInstance({
        method: "GET",
        url: "/auth/checkUser"    
      });
      if (response.status === 200) {
        dispatch(saveUserData());
      } else {
        dispatch(clearUserData());
        navigate("/login")
      }
    } catch (err) {
      console.log(err || "user not authorized");

      dispatch(clearUserData());
      navigate("/login")
    }
  }
  
  useEffect(() => {
    checkUser();
  }, []);
  useEffect(() => {
      const theme = localStorage.getItem("theme");
      document.documentElement.setAttribute("data-theme", theme);
    }, []);

  return (

    initialized ?
      <div className='flex bg-brand-extralight h-screen overflow-hidden'>
        
        <div className='h-screen'><Sidebar /></div>

        <div className='flex-1 overflow-auto scrollbar-thin scrollbar-thumb-brand-dark scrollbar-track-brand-extralight'>
          <div className=' min-h-screen '>
            <Outlet />

          </div>
          <div><Footer /></div>
        </div>

      </div>
      :
      <div className="min-h-screen dark:bg-dark-light bg-brand-extralight flex justify-center items-center">
        <span className="loading loading-bars loading-lg text-brand"></span>
      </div>
  )
}

export default MainLayout