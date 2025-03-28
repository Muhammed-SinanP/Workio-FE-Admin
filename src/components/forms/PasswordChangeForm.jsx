import React from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { passwordChangeSchema } from "../../schemas/authSchema";
import { axiosInstance } from "../../config/axiosInstance";

const PasswordChangeForm = () => {
    const navigate = useNavigate();

    const {
        handleSubmit,
        register,
        formState: { errors },
    } = useForm({ resolver: zodResolver(passwordChangeSchema) });

    async function changePassword(data) {
        toast.dismiss()
        const loading = toast.loading("Updating password")
        try {
            const response = await axiosInstance({
                method: "POST",
                url: "/user/changeMyPassword",
                data: data,
            });

            if (response.status === 200) {
                toast.dismiss(loading)
                toast.success("Password updated successfully");
                navigate("/adminProfile");
            } else {
                toast.dismiss(loading)
                toast.error("Password updation failed")
            }
        } catch (err) {
            toast.dismiss(loading)
            if (err.status === 401) {
                toast.error("Incorrect password");
            } else if (err.status == 400) {
                toast.error("Current and new passwords can't be same");
            } else {
                toast.error("Password updation failed")
            }
        }
    }

    return (
        <form
            className="flex flex-col gap-2.5 dark:text-dark-text"
            onSubmit={handleSubmit(changePassword)}
        >
            <div className="flex flex-col gap-1">
                <label htmlFor="password">Current password</label>
                <input
                    id="password"
                    {...register("password")}
                    className="input-style"
                    placeholder="****"
                />
                {errors.password && (
                    <p className="text-xs tracking-wide text-red-500">
                        {errors?.password.message}
                    </p>
                )}
            </div>
            <div className="-mt-1.5 text-end">
                <span
                    onClick={() => navigate("/forgotPassword")}
                    className="forgot-password"
                >
                    Forgot password?
                </span>
            </div>
            <div className="flex flex-col gap-1">
                <label htmlFor="newPassword">New password</label>
                <input
                    id="newPassword"
                    {...register("newPassword")}
                    className="input-style"
                    placeholder="****"
                />
                {errors.newPassword && (
                    <p className="text-xs tracking-wide text-red-500">
                        {errors?.newPassword.message}
                    </p>
                )}
            </div>
            <div className="flex flex-col gap-1">
                <label htmlFor="ConfirmNewPassword">Confirm new password</label>
                <input
                    id="ConfirmNewPassword"
                    {...register("confirmNewPassword")}
                    className="input-style"
                    placeholder="****"
                />
                {errors.confirmNewPassword && (
                    <p className="text-xs tracking-wide text-red-500">
                        {errors?.confirmNewPassword.message}
                    </p>
                )}
            </div>
            <input
                type="submit"
                value="Update"
                className="btn btn-wide border-none bg-brand text-base text-white hover:bg-brand-dark"
            />
        </form>
    );
};

export default PasswordChangeForm;