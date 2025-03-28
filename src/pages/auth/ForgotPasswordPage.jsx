import React from "react";
import { useState } from "react";
import { axiosInstance } from "../../config/axiosInstance";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { forgotPasswordSchema } from "../../schemas/authSchema";

const ForgotPasswordPage = () => {
  const navigate = useNavigate();
  const[disableBtn,setDisableBtn] = useState(false)
  const { register, handleSubmit, formState: { errors } } = useForm({ resolver: zodResolver(forgotPasswordSchema) })

  async function handlePasswordReset(data) {
    toast.dismiss()
    const loading = toast.loading("Sending email")
    try {
      const response = await axiosInstance({
        method: "POST",
        url: "/auth/forgotPassword",
        data: data,
      });
      if (response.status == 200) {
        toast.dismiss(loading)
        toast.success("Email sent successfully")
        navigate("/");
      }
    } catch (err) {
        toast.dismiss(loading)
        toast.error("Failed to sent email")
    }finally{
      toast.dismiss(loading)
    }
  }
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);


  return (
    <div className="main-div min-h-screen flex flex-col items-center  gap-6">
      <div className="text-center font-medium">
        A password reset link will be send to your registered email once you
        click 'Send Reset URL'. Click on that link to create a new password.
      </div>
      <div className="text-center font-medium">
        NB: Reset URL will be expired after the time limit.
      </div>
      <form onSubmit={handleSubmit(handlePasswordReset)} className="flex flex-col gap-1">
        <div className="flex w-80 flex-col gap-1">
          <label htmlFor="userEmail" className="text-base">
            Provide the registered email
          </label>
          <input
            {...register("email")}
            className="input-style"
            placeholder="abcd@gmail.com"
          />
          {errors.email && <p className="err-msg">{errors.email.message}</p>}
        </div>
        <div className="mt-2 text-center">
          <button
            type="submit"
            className="btn border-none bg-brand text-white hover:bg-brand-dark "
          >Send Reset URL</button>
        </div>
      </form>
    </div>
  );
};

export default ForgotPasswordPage;
