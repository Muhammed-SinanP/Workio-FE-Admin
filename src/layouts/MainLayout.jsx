import React, { useEffect, useRef } from 'react'
import Footer from '../components/Footer'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import Sidebar from '../components/Sidebar'
import { useDispatch, useSelector } from "react-redux";
import { axiosInstance } from "../config/axiosInstance";
import { clearUserData, saveUserData } from "../redux/features/userSlice";
import LoadingBars from '../components/loading/LoadingBars';

const MainLayout = () => {
  const { initialized } = useSelector(state => state.user)
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
        navigate("/auth/login")
      }
    } catch (err) {
      dispatch(clearUserData());
      navigate("/auth/login")
    }
  }

  useEffect(() => {
    checkUser();
  }, [location.pathname]);

  useEffect(() => {
    const theme = localStorage.getItem("theme");
    document.documentElement.setAttribute("data-theme", theme);
  }, []);


  const mainRef = useRef(null);

  function scrollToTop(){
    if (mainRef.current) {
      mainRef.current.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  useEffect(() => {
   scrollToTop()
  }, [location.pathname]);

  return (

    initialized ?
      <div className='flex bg-brand-extralight dark:bg-dark-light h-screen overflow-hidden'>

        <div className='h-screen'><Sidebar /></div>

        <div ref={mainRef} className='flex-1 overflow-auto scrollbar-thin scrollbar-thumb-brand-dark scrollbar-track-brand-extralight'>
          <div className='min-h-screen '>
            <Outlet context={{ scrollToTop }} />
          </div>
          <Footer />
        </div>

      </div>
      
      :

      <div className="min-h-screen dark:bg-dark-light bg-brand-extralight flex justify-center items-center">
        <LoadingBars />
      </div>
  )
}

export default MainLayout