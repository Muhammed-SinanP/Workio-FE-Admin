import React from "react";
import PasswordChangeForm from "../components/forms/PasswordChangeForm";

const ChangePasswordPage = () => {
    return (
        <div className="">
            <div className="heading">Change Password</div>
            <div className="main-div mt-6 flex items-center justify-center">
                <PasswordChangeForm />
            </div>
        </div>
    );
};

export default ChangePasswordPage;