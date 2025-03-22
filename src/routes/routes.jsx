import {createBrowserRouter} from "react-router-dom"
import MainLayout from "../layouts/MainLayout"
import ErrorPage from "../pages/ErrorPage"
import LoginPage from "../pages/LoginPage"
import DashboardPage from "../pages/DashboardPage"
import AllUsersPage from "../pages/AllUsersPage"
import UsersSeekersPage from "../pages/UsersSeekersPage"
import UsersEmployersPage from "../pages/UsersEmployersPage"

import ForgotPasswordPage from "../pages/ForgotPasswordPage"
import ResetPasswordPage from "../pages/ResetPasswordPage"
import JobPostsVerifiedPage from "../pages/JobPostsVerifiedPage"
import JobPostsPendingPage from "../pages/JobPostsPendingPage"
import AllJobPostsPage from "../pages/AllJobPostsPage"
import JobDetailsPage from "../pages/JobDetailsPage"
import ProfilePage from "../pages/ProfilePage"

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
                path:"allUsers",
                element:<AllUsersPage/>
            },
            {
                path:"allJobSeekers",
                element:<UsersSeekersPage/>
            },
            {
                path:"allEmployers",
                element:<UsersEmployersPage/>
            },
            {
                path:"allJobPosts",
                element:<AllJobPostsPage/>
            },
            {
                path:"jobPosts/verified",
                element:<JobPostsVerifiedPage/>
            },
            {
                path:"jobPosts/pending",
                element:<JobPostsPendingPage/>
            },
            {
                path:"jobPost/:jobId",
                element:<JobDetailsPage/>
            },
            {
                path: "adminProfile",
                element: <ProfilePage />
            }
            

        ]
    },
    {
        path:"/login",
        element:<LoginPage/>
    },
    {
        path:"/forgotPassword",
        element:<ForgotPasswordPage/>
    },
    {
        path:"/resetPassword/:resetToken",
        element:<ResetPasswordPage/>
    }

])