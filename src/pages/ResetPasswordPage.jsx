import React from 'react'
import { useState } from 'react'
import { useParams } from "react-router"
import { axiosInstance } from '../config/axiosInstance'
import {useNavigate} from "react-router-dom"
import { useEffect } from 'react'
import Header from '../components/Header'

const ResetPasswordPage = () => {
    const navigate = useNavigate()
    const params = useParams()
    const resetToken = params.resetToken
const [formData,setFormData] = useState({
    newPassword:"",
    ConfirmNewPassword:""
})
     const formValid = formData.newPassword.trim() !==""&&formData.ConfirmNewPassword.trim()!==""&& formData.newPassword === formData.ConfirmNewPassword
async function handleSubmit(e) {
    e.preventDefault()
    try {
        const response = await axiosInstance({
            method:"POST",
            url:`/auth/resetPassword/${resetToken}`,
            data:formData
        })
        if(response.status===200){
            console.log("password reset sucess")
            navigate("/")
        }
    } catch (err) {
       console.log("err reseting password fe",err) 
    }
    
}
    function handleChange(e){
        const {name,value} = e.target
       setFormData(prev=>{
        return{
            ...prev,
            [name]:value
        }
       })
    }
    useEffect(() => {
        window.scrollTo(0, 0);
      }, []);
  return (
    <>
    <Header/>
    <div className='flex flex-col items-center justify-center p-10 '>
          <div>Enter new password and submit to change the password of your Workio account</div>
        <div>
            <form onSubmit={handleSubmit} className='flex flex-col gap-2 border rounded-md shadow-md p-4 mt-4'>
                <div className='flex flex-col gap-1'><label htmlFor="newPassword" className='text-sm'>Enter new password</label>
                <input type="text" id='newPassword' name='newPassword' onChange={handleChange} value={formData.newPassword} className='border p-1 text-sm rounded-md focus:outline-none' required/></div>
                <div className='flex flex-col gap-1'><label htmlFor="ConfirmNewPassword" className='text-sm'>Confirm new password</label>
                <input type="text" id='ConfirmNewPassword' name='ConfirmNewPassword' onChange={handleChange} value={formData.ConfirmNewPassword} className='p-1 text-sm rounded-md border focus:outline-none' required/></div>
                <div className='text-center mt-2'>
                    <input type="submit" className={`bg-brandColor p-1.5 px-2 rounded-md text-white ${formValid?"cursor-pointer hover:bg-brandColor-dark active:scale-95":"opacity-50 cursor-not-allowed"} `} disabled={!formValid}/>
                </div>
            
            </form>
        </div>
    </div>
    </>
  )
}

export default ResetPasswordPage