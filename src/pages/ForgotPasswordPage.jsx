import React from "react";
import { useState } from "react";
import { axiosInstance } from "../config/axiosInstance";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Header from "../components/Header";
import toast from "react-hot-toast";

const ForgotPasswordPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    userRole: "admin",
    userEmail: "",
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  }
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const response = await axiosInstance({
        method: "POST",
        url: "/auth/forgotPassword",
        data: formData,
      });
      if (response.status == 200) {
        console.log("email send success");
        toast.success("Email sent successfully")
        navigate("/");
      }
    } catch (err) {
      console.log("err in send email", err);
    }
  }
  return (
    <>
    <Header/>
    <div className="flex flex-col gap-4 h-full pt-20 justify-center items-center p-10">
      <div>
        We will send you a password reset link to your email to reset your
        password. Click on that link within 15 minutes.{" "}
      </div>
      <form onSubmit={handleSubmit} className="flex flex-col gap-1">
        <div className="flex flex-col gap-1">
          <label htmlFor="userEmail" className="text-sm">
            Provide the email you used to register in Workio
          </label>
          <input
            type="email"
            id="userEmail"
            name="userEmail"
            onChange={handleChange}
            value={formData.userEmail}
            className="border rounded-md focus:outline-none p-1"
            placeholder="abcd@gmail.com"
            required
          />
        </div>
        <div className="text-center mt-2">
          <input
            type="submit"
            value="Send reset url"
            className="bg-brandColor p-1.5 px-2 rounded-md text-white cursor-pointer hover:bg-brandColor-dark active:scale-95"
          />
        </div>
      </form>
    </div>
    </>
  );
};

export default ForgotPasswordPage;
