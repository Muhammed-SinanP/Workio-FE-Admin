import React, { useState } from "react";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import { SidebarData } from "./Data";
import { NavLink } from "react-router-dom";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import DarkModeBtn from "../components/buttons/DarkModeBtn";
import Logo from "./Logo";

const Sidebar = () => {
  const [expandSidebar, setExpandSidebar] = useState(false)
  const [showSubDiv, setShowSubDiv] = useState("")
  const [showSubDivPopUp, setShowSubDivPopUp] = useState("")

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

  return (
    <div className="bg-brand relative text-sm sm:text-base dark:bg-dark-input h-full flex flex-col p-2 text-brand-extralight transition-all duration-300 ease-in-out">
      <Logo expandSidebar={expandSidebar} />

      <div className="text-3xl invisible">dfa</div>

      <div onClick={() => setExpandSidebar(!expandSidebar)} className="absolute z-40 p-1 top-14 -right-3.5 shadow-md bg-brand-light  text-white  cursor-pointer rounded-full flex justify-center items-center">
        {expandSidebar ? <KeyboardDoubleArrowLeftIcon fontSize="small" /> : <KeyboardDoubleArrowRightIcon fontSize="small" />}
      </div>

      <div className="flex flex-col gap-1">
        {SidebarData.map((element, index) =>
          <div key={index} className={`rounded-sm ${!expandSidebar && "flex justify-center"}`}>

            {element.path ?
              <NavLink
                title={!expandSidebar ? element.title : undefined}
                to={element.path}
                className={({ isActive }) =>
                  `flex items-center gap-1 cursor-pointer rounded-sm p-1 ${isActive ? "bg-brand-dark" : "hover:bg-brand-light"}`
                }
              >
                <span className="flex items-center">{element.icon}</span>
                {expandSidebar && <p>{element.title}</p>}
              </NavLink>

              :

              <div className={`relative ${showSubDiv === element.title || showSubDivPopUp === element.title ? "bg-brand-light" : ""}  rounded-sm`}>

                <div onClick={() => handleDiv(element.title)} title={!expandSidebar ? element.title : undefined} className={`flex items-center gap-1 cursor-pointer rounded-sm p-1 ${!expandSidebar && "hover:bg-brand-light"}`}>
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
                        end
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
                {!expandSidebar && showSubDivPopUp === element.title && <div className="absolute z-10 w-28 py-1 rounded-sm -right-28 top-0 flex bg-brand-light shadow-md flex-col text-sm">
                  {element.children.map((element, index) => (
                    <NavLink
                      end
                      onClick={() => {
                        setShowSubDiv(element.parent);
                        setShowSubDivPopUp("");
                      }}
                      key={index}
                      to={element.path}
                      className={({ isActive }) =>
                        `flex items-center gap-1 cursor-pointer p-1 ${isActive ? "bg-brand-dark" : "hover:bg-brand-dark"}`
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
      </div>

      <div className="flex-1 pb-20 my-4 flex flex-col justify-end items-center">
        <DarkModeBtn expandSidebar={expandSidebar} />
      </div>

    </div>
  );
};

export default Sidebar;
