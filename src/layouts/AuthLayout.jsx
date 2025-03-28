import React, { useEffect } from 'react'
import { Navigate, Outlet, useLocation } from 'react-router-dom'
import AuthHeader from '../components/AuthHeader';
import Footer from '../components/Footer';

const AuthLayout = () => {
    const location = useLocation();

    if (location.pathname === "/auth") {
        return <Navigate to="/auth/login" replace />;
    }

    useEffect(() => {
        const theme = localStorage.getItem("theme");
        document.documentElement.setAttribute("data-theme", theme);
    }, []);

    return (
        <div className="flex flex-col bg-brand-extralight dark:bg-dark-light">
            <AuthHeader />
            <div className='min-h-screen'><Outlet/></div>
            <Footer />
        </div>
    )
}

export default AuthLayout