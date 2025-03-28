import {createBrowserRouter} from "react-router-dom"
import MainLayout from "../layouts/MainLayout"

import ErrorPage from "../pages/ErrorPage"
import ProfilePage from "../pages/ProfilePage"
import ChangePasswordPage from "../pages/ChangePasswordPage"
import DashboardPage from "../pages/DashboardPage"

import LoginPage from "../pages/auth/LoginPage"
import ForgotPasswordPage from "../pages/auth/ForgotPasswordPage"
import ResetPasswordPage from "../pages/auth/ResetPasswordPage"

import VerifiedJobPostsPage from "../pages/jobs/VerifiedJobPostsPage"
import PendingJobPostsPage from "../pages/jobs/PendingJobPostsPage"
import AllJobPostsPage from "../pages/jobs/AllJobPostsPage"
import JobDetailsPage from "../pages/jobs/JobDetailsPage"

import AllUsersPage from "../pages/users/AllUsersPage"
import JobSeekersPage from "../pages/users/JobSeekersPage"
import EmployersPage from "../pages/users/EmployersPage"
import AuthLayout from "../layouts/AuthLayout"

export const router = createBrowserRouter([
    {
        path:"/",
        element:<MainLayout/>,
        errorElement:<ErrorPage/>,
        children:[
            {
                path:"",
                element:<DashboardPage/>
            },
            {
                path:"users",
                element:<AllUsersPage/>
            },
            {
                path:"users/jobSeekers",
                element:<JobSeekersPage/>
            },
            {
                path:"users/Employers",
                element:<EmployersPage/>
            },
            {
                path:"jobPosts",
                element:<AllJobPostsPage/>
            },
            {
                path:"jobPosts/verified",
                element:<VerifiedJobPostsPage/>
            },
            {
                path:"jobPosts/pending",
                element:<PendingJobPostsPage/>
            },
            {
                path:"jobPost/:jobId",
                element:<JobDetailsPage/>
            },
            {
                path: "adminProfile",
                element: <ProfilePage />
            },
            {
                path:"changeMyPassword",
                element:<ChangePasswordPage/>
            }
            

        ]
    },
    {
        path:"/auth",
        element:<AuthLayout/>,
        
        children:[
            {
                path: "login",
                element: <LoginPage />
            },
            {
                path: "forgotPassword",
                element: <ForgotPasswordPage />
            },
            {
                path: "resetPassword/:resetToken",
                element: <ResetPasswordPage />
            }
        ]
    },
    

])