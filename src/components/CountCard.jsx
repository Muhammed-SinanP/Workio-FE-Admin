import React from "react";
import { useNavigate } from "react-router-dom";

const CountCard = ({icon,title,count,bgColor,path}) => {
  const navigate = useNavigate()
  return (
    <div onClick={() => navigate(path)} className={`${bgColor} dark:darkCard ${!path ? "cursor-not-allowed" :"cursor-pointer"}  text-white rounded-md shadow-md flex 2xl:col-span-2  xl:col-span-2 lg:col-span-3 md:col-span-3 sm:col-span-4 col-span-10 gap-2 p-2 sm:p-4`}>
      <div >
       {icon}
      </div>
      <div className="flex-1">
        <div className="sm:pl-2 sm:text-sm text-xs">{title}</div>
       
          <div className="text-end text-lg sm:text-2xl font-medium">{count ? count:<span className="loading loading-spinner"></span>}</div>
        
      </div>
    </div>
  );
};

export default CountCard;
