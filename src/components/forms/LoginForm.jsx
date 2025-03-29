import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from '../../schemas/authSchema';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';
import toast from "react-hot-toast";
import { axiosInstance } from '../../config/axiosInstance';
import { useDispatch } from 'react-redux';
import { clearUserData, saveUserData } from "../../redux/features/userSlice";
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
    const { register, handleSubmit, formState: { errors } } = useForm({ resolver: zodResolver(loginSchema) })
    const [showPassword, setShowPassword] = useState(false)
    const [disableBtn,setDisableBtn] = useState(false)
    const dispatch = useDispatch();
    const navigate = useNavigate()

    async function submitLoginForm(data) {
        setDisableBtn(true)
        try {
            const response = await axiosInstance({
                method: "POST",
                url: "/auth/login",
                data: data,
            });
            if (response.status === 200) {
                dispatch(saveUserData());
                toast.success("Logged in successfully");
                navigate(-1);
            } else {
                dispatch(clearUserData());
            }
        } catch (err) {
            dispatch(clearUserData());
            if (err.status == 404) {
                toast.error("User does not exist");
            } else if (err.status === 401) {
                toast.error("Incorrect password");
            }
        }finally{
            setDisableBtn(false)
        }
    }
    return (
        <form
            onSubmit={handleSubmit(submitLoginForm)}
            className="flex flex-col gap-2.5"
        >
            <div className="flex flex-col gap-1">
                <label htmlFor="email" className="dark:text-dark-text">
                    Email
                </label>
                <input
                    id="email"
                    placeholder="jhondoe@gmail.com"
                    className={`${errors.email && "border-red-500"} input-style dark:text-dark-text`}
                    {...register("email")}
                />
                {errors.email && (
                    <p className="err-msg">{errors.email.message}</p>
                )}
            </div>
            <div className="flex flex-col gap-1">
                <label htmlFor="password" className="dark:text-dark-text">
                    Password
                </label>
                <div className="relative flex flex-col gap-1">
                    <input
                        type={showPassword ? "text" : "password"}
                        id="password"
                        placeholder="****"
                        className={`${errors.password && "border-red-500"} input-style pr-8 dark:text-dark-text`}
                        {...register("password")}
                        autoComplete='off'
                    />
                    {errors.password && (
                        <p className="err-msg">{errors.password.message}</p>
                    )}
                    <span
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-1.5 top-1 rounded-full"
                    >
                        {showPassword ? (
                            <VisibilityIcon className="cursor-pointer text-dark-text" />
                        ) : (
                            <VisibilityOffIcon className="cursor-pointer text-dark-text" />
                        )}
                    </span>
                </div>
            </div>

            <div className="-mt-2 text-end">
                <span
                    onClick={() => navigate("/auth/forgotPassword")}
                    className="forgot-password"
                >
                    forgot password?
                </span>
            </div>

            <div className="mt-2.5">
                <button type="submit" className={`btn w-full border-none bg-brand text-base text-white hover:bg-brand-dark`} disabled={disableBtn}>Login</button>
            </div>
        </form>
    )
}

export default LoginForm