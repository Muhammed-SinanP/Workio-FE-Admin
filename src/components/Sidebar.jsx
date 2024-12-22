import React, { useRef, useState } from "react";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import { SidebarData } from "./Data";
import LogoImg from "../assets/logo.png";
import { NavLink, useNavigate } from "react-router-dom";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import DarkModeBtn from "./DarkModeBtn";
import LogoutIcon from '@mui/icons-material/Logout';
import { axiosInstance } from "../config/axiosInstance";
import { useConfirm } from "material-ui-confirm";

const Sidebar = () => {
    const [toggleDiv,setToggleDiv]=useState("")
    const [expandSidebar,setExpandSidebar] = useState(false)
    const [showSubDiv,setShowSubDiv] = useState("")
    const subDivTimeoutRef = useRef(null);
    const confirm = useConfirm()
    const navigate = useNavigate()

    function handleDiv(title){
      if (subDivTimeoutRef.current) {
        clearTimeout(subDivTimeoutRef.current);
      }
      
      if(toggleDiv===title){
        setToggleDiv("")
        setShowSubDiv("")
      }
      else{
        setToggleDiv(title)
        setShowSubDiv(title)
      }
       
      subDivTimeoutRef.current = setTimeout(() => {
        setShowSubDiv("");
        setToggleDiv("")
      }, 10000);
       
    }


    function handleLogout() {
        async function userLogout() {
          try {
            const response = await axiosInstance({
              method: "POST",
              url: "/auth/logout",
            });
            if (response.status === 200) {
              navigate("/login");
            }
          } catch (err) {
            console.log("logout err occured", err);
          }
        }
    
        confirm({
          title: "Logout Confirmation",
          description: "Are you sure you want to do logout?",
          confirmationText: "Confirm",
        })
          .then(() => {
            userLogout();
          })
          .catch(() => {
            console.log("logout cancelled");
          });
      }

  return (
    <div className="bg-brandColor-dark dark:text-darkColor-text dark:bg-darkColor-light scrollbar-hide  h-full flex flex-col p-1.5 text-gray-100 transition-all duration-300 ease-in-out">
      <div className={`flex items-center gap-0.5 h-8 justify-center`}>
        <img src={LogoImg} alt="Logo image" className="h-5" />
       {expandSidebar&&<div className="flex flex-col"><span className="font-brandFont dark:text-brandColor-lighter">Workio</span><span className="text-[0.5rem] -mt-1.5 ml-4 font-brandFont tracking-wide dark:text-brandColor-light">for admin</span></div> }
      </div>
      <div className="relative h-6">
        <div onClick={()=>setExpandSidebar(!expandSidebar)} className="absolute -right-4 bg-brandColor-lighter hover:bg-brandColor-light text-brandColor-dark cursor-pointer rounded-full flex justify-center items-center ">
          {expandSidebar?<KeyboardDoubleArrowLeftIcon fontSize="small" className="p-1" />:<KeyboardDoubleArrowRightIcon fontSize="small" className="p-1" />}
        </div>
      </div>
      <div className="flex-1 gap-1 flex flex-col mt-2">
        {SidebarData.map((element, index) => (
          <div key={index} className="">
            {element.path ? (
              <NavLink
                to={element.path}
                className={({ isActive }) =>
                  `flex items-center cursor-pointer rounded-sm  px-1 ${isActive?"bg-brandColor-lighter dark:text-darkColor-input  text-brandColor-dark":"hover:bg-brandColor dark:hover:bg-brandColor-light dark:hover:text-darkColor-input"}`
                }
              >
                {element.icon}
              {expandSidebar&&<div className="text-xs pr-1 flex-1">{element.title}</div>}  
              </NavLink>
            ) : (
              <div>
                <div onClick={()=>handleDiv(element.title)} className={`flex  relative items-center gap-1 cursor-pointer rounded-sm hover:bg-brandColor dark:hover:bg-brandColor-light dark:hover:text-darkColor-input  pl-1 text-xs ${showSubDiv === element.title?"bg-brandColor dark:bg-brandColor-light dark:text-darkColor-input":""}`}>
                  <span className="flex-1 flex items-center">
                    {element.icon}
                    <span className="mb-0.5">{expandSidebar&&element.title}</span>
                  </span>{" "}
                  <span>
                    {element.children && expandSidebar && (
                      toggleDiv === element.title?<ArrowDropUpIcon fontSize="small" className="p-0.5" />:<ArrowDropDownIcon fontSize="small" className="p-0.5" />
                    )}
                  </span>


                  <div className={`absolute w-28  -right-[7.1rem] -bottom-14 z-10 ${showSubDiv===element.title&&!expandSidebar?"flex flex-col":"hidden"} p-1 bg-brandColor dark:bg-darkColor-text rounded-sm shadow-sm   gap-0.5  text-[0.62rem]`}>
                    {element.children.map((element, index) => (
                      <NavLink
                        key={index}
                        to={element.path}
                        className={({ isActive }) =>
                          `px-2  rounded-sm py-0.5 ${isActive?"bg-brandColor-lighter dark:text-darkColor-input text-brandColor-dark":"hover:bg-brandColor-dark dark:hover:bg-brandColor-light dark:hover:text-darkColor-input"}`
                        }
                      >
                        {element.title}
                      </NavLink>
                    ))}
                  </div>
                </div>
                {element.children && toggleDiv === element.title && expandSidebar && (
                  <div className="flex flex-col gap-0.5  text-[0.62rem] mt-0.5">
                    {element.children.map((element, index) => (
                      <NavLink key={index}
                        to={element.path}
                        className={({ isActive }) =>
                          ` pl-6 rounded-sm py-0.5 ${isActive?"bg-brandColor-lighter dark:text-darkColor-input text-brandColor-dark":"hover:bg-brandColor dark:hover:bg-brandColor-light dark:hover:text-darkColor-input"}`
                        }
                      >
                        {element.title}
                      </NavLink>
                    ))}
                  </div>
                )}



              </div>
            )}
          </div>
        ))}
      </div>
      <div className={`flex justify-center my-4`}><DarkModeBtn/></div>
     <div className="text-xs flex justify-center mb-4 "> <div onClick={handleLogout} className="bg-gray-500 flex items-center active:scale-95 px-1 py-0.5 cursor-pointer hover:bg-gray-600 rounded-md"><LogoutIcon fontSize="small" className="p-1 px-0"/> {expandSidebar&&<span>Logout</span>}</div></div>
    </div>
  );
};

export default Sidebar;
