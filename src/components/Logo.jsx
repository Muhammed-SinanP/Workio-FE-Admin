import React from 'react'
const brandLogo = "/logo.png"
import { useNavigate } from "react-router-dom";
const Logo = ({ expandSidebar }) => {
    const navigate = useNavigate()
    return (
        <div onClick={() => navigate("/")} className="cursor-pointer flex gap-0.5 p-1 items-start">
            <div className=''><img src={brandLogo} alt="brand logo" className="h-10" /></div>
            {expandSidebar && <div className='flex flex-col text-brand-extralight'>
                <span className="sm:text-2xl text-lg font-brand-font -mt-0.5">
                    Workio
                </span>
                <span className="-mt-1.5 text-end text-xxs sm:text-xs font-medium ml-2 sm:ml-4 ">
                    for admin
                </span>
            </div>}
        </div>
    )
}

export default Logo