import React, { useState } from "react";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import { SidebarData } from "./Data";
import { NavLink, useNavigate } from "react-router-dom";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import DarkModeBtn from "./DarkModeBtn";
import LogoutIcon from '@mui/icons-material/Logout';
import { axiosInstance } from "../config/axiosInstance";
import { useConfirm } from "material-ui-confirm";
import Logo from "./Logo";
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';

const Sidebar = () => {
  const [expandSidebar, setExpandSidebar] = useState(false)
  const [showSubDiv, setShowSubDiv] = useState("")
  const [showSubDivPopUp, setShowSubDivPopUp] = useState("")

  const confirm = useConfirm()
  const navigate = useNavigate()


  function handleDiv(title) {
    if (expandSidebar) {
      setShowSubDivPopUp("")
      showSubDiv === title ? setShowSubDiv("") : setShowSubDiv(title)
    }
    else {
  
      if (showSubDivPopUp === title) {
        setShowSubDivPopUp("");
        setShowSubDiv("");
      } else {
        setShowSubDivPopUp(title);
        setShowSubDiv(title);
      }
    }
  }

  function handleLogout() {
    async function userLogout() {
      try {
        const response = await axiosInstance({
          method: "POST",
          url: "/auth/logout",
          params: {
            userRole: "admin"
          }
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
    <div className="bg-brand relative text-sm sm:text-base  dark:text-dark-text dark:bg-dark-light  h-full flex flex-col  p-2 text-gray-100 transition-all duration-300 ease-in-out">
      <Logo expandSidebar={expandSidebar} />


      <div className="text-3xl invisible">dfa</div>
      <div onClick={() => setExpandSidebar(!expandSidebar)} className="absolute z-10 p-1 top-14 -right-3.5 shadow-md bg-brand-light  text-white  cursor-pointer rounded-full flex justify-center items-center ">
        {expandSidebar ? <KeyboardDoubleArrowLeftIcon fontSize="small" /> : <KeyboardDoubleArrowRightIcon fontSize="small" />}
      </div>

      {/* <div className="flex-1 gap-1 flex flex-col mt-2">
        {SidebarData.map((element, index) => (
          <div key={index} className="">
            {element.path ? (
              <NavLink
                to={element.path}
                className={({ isActive }) =>
                  `flex items-center gap-1 cursor-pointer rounded-sm  px-1 ${isActive?"bg-brand-lighter dark:text-dark-input  text-brand-dark":"hover:bg-brand dark:hover:bg-brand-light dark:hover:text-dark-input"}`
                }
              >
               <div className="mb-1">{element.icon}</div> 
              {expandSidebar&&<div className=" pr-1 flex-1">{element.title}</div>}  
              </NavLink>
            ) : (
              <div>
                <div onClick={()=>handleDiv(element.title)} className={`flex  relative items-center gap-1 cursor-pointer rounded-sm hover:bg-brand dark:hover:bg-brand-light dark:hover:text-dark-input  pl-1  ${showSubDiv === element.title?"bg-brand dark:bg-brand-light dark:text-dark-input":""}`}>
                  <span className="flex-1 flex items-center gap-1">
                    {element.icon}
                    <span className="">{expandSidebar&&element.title}</span>
                  </span>
                  <span>
                    {element.children && expandSidebar && (
                      toggleDiv === element.title?<ArrowDropUpIcon fontSize="small" className="p-0.5" />:<ArrowDropDownIcon fontSize="small" className="p-0.5" />
                    )}
                  </span>


                  <div className={`absolute w-28  -right-[7.1rem] -bottom-14 z-10 ${showSubDiv===element.title&&!expandSidebar?"flex flex-col":"hidden"} p-1 bg-brand dark:bg-dark-text rounded-sm shadow-sm   gap-0.5  text-[0.62rem]`}>
                    {element.children.map((element, index) => (
                      <NavLink
                        key={index}
                        to={element.path}
                        className={({ isActive }) =>
                          `px-2  rounded-sm py-0.5 ${isActive?"bg-brand-lighter dark:text-dark-input text-brand-dark":"hover:bg-brand-dark dark:hover:bg-brand-light dark:hover:text-dark-input"}`
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
                          ` pl-6 rounded-sm py-0.5 ${isActive?"bg-brand-lighter dark:text-dark-input text-brand-dark":"hover:bg-brand dark:hover:bg-brand-light dark:hover:text-dark-input"}`
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
      </div> */}


      {/* <div className={`flex justify-center my-4`}><DarkModeBtn/></div>
     <div className="text-xs flex justify-center mb-4 "> <div onClick={handleLogout} className="bg-gray-500 flex items-center active:scale-95 px-1 py-0.5 cursor-pointer hover:bg-gray-600 rounded-md"><LogoutIcon fontSize="small" className="p-1 px-0"/> {expandSidebar&&<span>Logout</span>}</div></div>
     */}



      <div className="flex flex-col gap-1">
        {SidebarData.map((element, index) =>
          <div key={index} className={`rounded-md ${!expandSidebar && "flex justify-center"}`} >


            {element.path ?
              <NavLink
                title={!expandSidebar ? element.title:undefined}
                to={element.path}
                className={({ isActive }) =>
                  `flex items-center gap-1 cursor-pointer rounded-md p-1 ${isActive ? "bg-brand-dark" : "hover:bg-brand-light"}`
                }
              >
                <span className="flex items-center">{element.icon}</span>
                {expandSidebar && <p>{element.title}</p>}
              </NavLink>

              :



              <div className={`relative ${showSubDiv === element.title || showSubDivPopUp === element.title ? "bg-brand-light" : ""}  rounded-md`}>

                <div onClick={() => handleDiv(element.title)} title={!expandSidebar ? element.title:undefined} className={`flex items-center gap-1 cursor-pointer rounded-md p-1 ${!expandSidebar && "hover:bg-brand-light"}`}>
                  <span className="flex items-center">{element.icon}</span>
                  {expandSidebar && <p className="flex-1">{element.title}</p>}

                  {showSubDiv === element.title ?

                    expandSidebar && <ArrowDropUpIcon fontSize="small" /> :
                    expandSidebar && <ArrowDropDownIcon fontSize="small" />
                  }
                </div>

                {/* Normal sub div */}
                {expandSidebar && showSubDiv === element.title &&
                  <div className="flex flex-col  pb-1 text-sm">
                    {element.children.map((element, index) => (
                      <NavLink

                        key={index}
                        to={element.path}
                        className={({ isActive }) =>
                          `flex items-center gap-1 cursor-pointer  pl-7 py-1 ${isActive ? "bg-brand-dark " : "hover:bg-brand-dark"}`
                        }
                      >
                        {element.title}
                      </NavLink>
                    ))}
                  </div>}


                {/* Popup sub div */}
                {!expandSidebar && showSubDivPopUp === element.title && <div className="absolute w-28 py-1 rounded-md  -right-28 top-0 flex bg-brand-light shadow-md flex-col text-sm">
                  {element.children.map((element, index) => (
                    <NavLink
                      onClick={() => {


                        setShowSubDiv(element.parent);
                        setShowSubDivPopUp("");

                      }}
                      key={index}
                      to={element.path}
                      className={({ isActive }) =>
                        `flex items-center gap-1 cursor-pointer  p-1 ${isActive ? "bg-brand-dark" : "hover:bg-brand-dark"}`
                      }
                    >
                      {element.title}
                    </NavLink>
                  ))}
                </div>}

              </div>


            }





          </div>



        )}

        <div className={`rounded-md ${!expandSidebar && "flex justify-center"}`} >
        <NavLink
          title={!expandSidebar ? "Admin profile" : undefined}
          to={"/adminProfile"}
          className={({ isActive }) =>
            `flex items-center gap-1 cursor-pointer rounded-md p-1 ${isActive ? "bg-brand-dark" : "hover:bg-brand-light"}`
          }
        >
          <span className="flex items-center"><AdminPanelSettingsIcon/></span>
          {expandSidebar && <p>Admin profile</p>}
        </NavLink>
        </div>
      </div>

       <div className=" flex-1 pb-20 my-4 flex flex-col justify-end items-center">
        <DarkModeBtn expandSidebar={expandSidebar}/>
       </div>

    </div>
  );
};

export default Sidebar;
