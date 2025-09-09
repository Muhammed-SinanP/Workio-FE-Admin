import React from "react";
import { useParams } from "react-router";
import { useEffect } from "react";
import PasswordResetForm from "../../components/forms/PasswordResetForm";
import AuthHeader from "../../components/AuthHeader";


const ResetPasswordPage = () => {
    const params = useParams();
    const resetToken = params.resetToken;

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="">
            
            <div className="main-div mt-8 flex w-full items-center justify-center">
                <div>
                    <PasswordResetForm resetToken={resetToken} />
                </div>
            </div>
        </div>
    );
};

export default ResetPasswordPage;