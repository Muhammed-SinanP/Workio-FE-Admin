import React, { useEffect } from 'react'

import Footer from '../components/Footer'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import Sidebar from '../components/Sidebar'
import { useDispatch } from "react-redux";
import { axiosInstance } from "../config/axiosInstance";
import { clearUserData, saveUserData } from "../redux/features/userSlice";

const MainLayout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate()

  const location = useLocation();
  async function checkUser() {
    try {
      const response = await axiosInstance({
        method: "GET",
        url: "/user/checkUser/admin",
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
  }, [location.pathname]);

  return (
    <div className='flex h-screen'>
     <div className='h-screen   '><Sidebar/></div> 
     <div className='flex flex-1 flex-col overflow-auto'>
      <div className='flex-1'><Outlet/>
      
      </div>
      <div><Footer/></div>
     </div>
    
    </div>
  )
}

export default MainLayout