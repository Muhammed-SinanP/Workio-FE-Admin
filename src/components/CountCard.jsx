import React from "react";
import { useNavigate } from "react-router-dom";

const CountCard = ({icon,title,count,bgColor,path}) => {
 
  
  
  const navigate = useNavigate()
  return (
    <div onClick={() => navigate(path)} className={`${bgColor}  ${!path ? "cursor-not-allowed" : "cursor-pointer hover:scale-105"}  text-white transition-all duration-500 ease-in-out rounded-md shadow-md flex gap-2 p-2 sm:p-4 col-span-8 sm:col-span-6 md:col-span-4 lg:col-span-3 xl:col-span-2`}>
      <div >
       {icon}
      </div>
      <div className="flex-1">
        <div className="sm:pl-2 sm:text-sm text-xs">{title}</div>
       
          <div className="text-end text-lg sm:text-2xl font-medium">{count?.toString() ? count:<span className="loading loading-spinner"></span>}</div>
        
      </div>
    </div>
  );
};

export default CountCard;
