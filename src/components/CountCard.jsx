import React from "react";
import { useNavigate } from "react-router-dom";

const CountCard = ({icon,title,count,bgColor,path}) => {
  const navigate = useNavigate()
  return (
    <div onClick={()=>navigate(path)} className={`${bgColor} dark:darkCard cursor-pointer text-white rounded-md shadow-md flex 2xl:col-span-2  xl:col-span-2 lg:col-span-3 md:col-span-3 sm:col-span-4 col-span-6 gap-2 p-4`}>
      <div >
       {icon}
      </div>
      <div className="flex-1">
        <div className="sm:pl-2 text-sm">{title}</div>
       
          <div className="text-end pr-2 text-2xl font-medium">{count}</div>
        
      </div>
    </div>
  );
};

export default CountCard;
