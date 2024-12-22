import React from 'react'
import DarkModeBtn from "../components/DarkModeBtn";
import LogoImg from "../assets/logo.png";
import {useNavigate} from "react-router-dom"

const Header = () => {
  const navigate = useNavigate()
  return (
    <div className="flex justify-between px-4 pt-1 w-full">
            <div onClick={()=>navigate("/")} className="flex items-center gap-0.5 h-8 justify-center cursor-pointer ">
              <img src={LogoImg} alt="Logo image" className="h-5" />
              <div className="flex  flex-col">
                <span className="font-brandFont text-brandColor">Workio</span>
                <span className="text-[0.5rem] -mt-1.5 ml-4 font-brandFont tracking-wide text-brandColor-dark dark:text-darkColor-text">
                  for admin
                </span>
              </div>
            </div>
            <div className="">
              <DarkModeBtn />
            </div>
          </div>
  )
}

export default Header