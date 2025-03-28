import React, { useEffect } from "react";
import { useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import { axiosInstance } from "../../config/axiosInstance";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod";
import { profileSchema } from "../../schemas/userSchema";
import LaunchIcon from '@mui/icons-material/Launch';
import { useNavigate } from "react-router-dom";


const ProfileForm = ({ userProfile, refreshPage }) => {
    const [edit, setEdit] = useState(false);
    const navigate = useNavigate()

    const { register, handleSubmit, formState: { errors }, setFocus, reset } = useForm({
        resolver: zodResolver(profileSchema),
        defaultValues: {
            userName: userProfile?.profile.name || "",
            userEmail: userProfile?.profile.email || "iam.muhammedsinan.p@gmail.com"
        }
    })

    function handleEdit() {
        setEdit(true);
        setFocus("userName")
    }

    async function handleProfileUpdate(data) {
        const loading = toast.loading("Updating profile")
        try {
            const response = await axiosInstance({
                method: "PUT",
                url: "/user/myProfile",
                data: data,
            });

            if (response.status === 200) {
                toast.loading(loading)
                toast.success("Profile updated successfully");
                setEdit(false);
                refreshPage()
            } else {
                toast.loading(loading)
                toast.error("Profile updation failed")
            }
        } catch (err) {
            toast.loading(loading)
            toast.error("Profile updation failed")
        }
    }
    return (
        <form onSubmit={handleSubmit(handleProfileUpdate)} className="mb-2 flex text-sm flex-col gap-2 text-dark dark:text-dark-text">
            <div className="flex flex-col">
                <label className="font-medium" htmlFor="userName">
                    Your Name
                </label>
                <input
                    id="userName"
                    className={`input-style capitalize bg-transparent ${edit ? "" : "cursor-auto border-none "
                        }`}
                    {...register("userName")}
                    readOnly={edit ? false : true}
                />
                {errors.userName && <p className="err-msg">{errors.userName.message}</p>}
            </div>

            <div className="mt-8 font-medium tracking-wide">
                {edit ? (
                    <input
                        type="submit"
                        value="Update"
                        className="btn btn-xs bg-green-500 hover:bg-green-600 text-white "
                    />
                ) : (
                    <button
                        className="flex items-center text-xs text-blue-500"
                        onClick={handleEdit}
                    >
                        <EditIcon className="p-0.5 pr-0 mb-0.5" fontSize="small" />

                        Edit profile

                    </button>
                )}
            </div>

            <div
                className="cursor-pointer  text-xs font-medium text-dark-light hover:text-dark  dark:text-dark-text dark:hover:text-dark-text"
                onClick={() => navigate("/changeMyPassword")}
            >
                Change password
                <LaunchIcon fontSize="small" className="p-0.5" />
            </div>

        </form>
    );
};

export default ProfileForm;