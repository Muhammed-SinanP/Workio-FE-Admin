import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ErrorDiv = ({ info }) => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    const navigate = useNavigate();
    return (
        <div className="main-div">
            <div className=" text-center tracking-wide">
                {info}
                <span
                    className="ml-1 cursor-pointer font-medium text-brand-dark underline dark:text-brand"
                    onClick={() => navigate("/")}
                >
                    Return to home
                </span>
            </div>
        </div>
    );
};

export default ErrorDiv;