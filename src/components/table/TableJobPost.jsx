import React from 'react'
import VisibilityIcon from '@mui/icons-material/Visibility';
import DoneIcon from '@mui/icons-material/Done';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { useNavigate } from 'react-router-dom';
import { axiosInstance } from '../../config/axiosInstance';
import { useConfirm } from 'material-ui-confirm';
import toast from 'react-hot-toast';
const TableJobPost = ({data,refresh,setRefresh,headColor,condition}) => {
  console.log(headColor,condition,data)
   const confirm = useConfirm()
    const navigate = useNavigate()
    function handleApproval(jobId,jobTitle,employer){

      async function approveJob(){
        try {
          const response = await axiosInstance({
            method:"PUT",
            url:`/admin/jobPost/${jobId}`
          })
          if(response.status === 200){
            toast.success("Job approved")
            setRefresh(!refresh)
          }
        } catch (err) {
          console.log(err)
          toast.error("Job approval failed")
        }
      }

      confirm({ title:"Confirm job approval",
        description:`Approving ${jobTitle} by ${employer}, this can't be undone`,
        confirmationText:"Confirm"
     })
    .then(() => {
      approveJob()
    })
    .catch(() => {
   console.log("approval cancel");
   
    });
      
    }

    function handleDelete(jobId,jobTitle,employer){
      async function deleteJob(){
        try {
          const response = await axiosInstance({
            method:"DELETE",
            url:`/admin/jobPost/${jobId}`
          })
          if(response.status === 200){
            toast.success("Job deleted")
            setRefresh(!refresh)
          }
        } catch (err) {
          console.log(err)
          toast.error("Job deletion failed")
        }
      }

      confirm({ title:"Confirm job deletion",
        description:`Deleting ${jobTitle} by ${employer}, this can't be undone`,
        confirmationText:"Confirm"
     })
    .then(() => {
      deleteJob()
    })
    .catch(() => {
   console.log("deletion cancel");
   
    });
    }
  return (
    <div>

     <div className={`grid grid-cols-12 text-xs gap-4 font-medium md:text-sm 2xl:text-lg ${headColor} dark:bg-darkColor-input dark:text-darkColor-text p-1.5 rounded-t-md text-white`}>
        <div className='col-span-4 sm:col-span-3'>Job title</div>
        <div className='col-span-3'>Employer</div>
        {condition==="none"&&<div className='col-span-3 sm:col-span-2'>Verification</div>}
        <div className='col-span-2 sm:col-span-4'>Action</div>
     </div>

{data&&data.length>0&& data.map((element,index)=><div key={index} className='grid border-b grid-cols-12 gap-3  text-xs md:text-sm 2xl:text-lg p-1.5  bg-gray-100 dark:bg-darkColor-light'>
        <div className='col-span-4 sm:col-span-3 overflow-hidden'>{element.title}</div>
        <div className='col-span-3 overflow-hidden'><div>{element.employer?.name}</div> <div className='text-xs'>{element.employer?.email}</div></div>
       {condition==="none" && <div className={`col-span-3 sm:col-span-2 ${element.verified===true?"text-green-600":"text-yellow-600"}`}>{element.verified?"Verified":"Pending"}</div>}
        <div className='col-span-2 sm:col-span-4 grid grid-cols-12 gap-2 '>
            <div className='col-span-12 sm:col-span-4'><button onClick={()=>navigate(`/jobPost/${element._id}`)} className='btn border-none btn-xs sm:w-full  bg-yellow-400 hover:bg-yellow-500 text-white'><span className='hidden sm:block'>Check</span><span className="block sm:hidden"><VisibilityIcon fontSize='small' className='p-0.5'/></span></button></div>
            {!element.verified&&<div className='col-span-12 sm:col-span-4'><button onClick={()=>handleApproval(element._id,element.title,element.employer.name)} className='btn border-none btn-xs sm:w-full bg-green-400 hover:bg-green-500 text-white'><span className='hidden sm:block'>Approve</span><span className="block sm:hidden"><DoneIcon  fontSize='small' className="0.5"/></span></button></div>}
            <div className='col-span-12 sm:col-span-4'><button onClick={()=>handleDelete(element._id,element.title,element.employer.name)} className='btn border-none btn-xs sm:w-full bg-red-500 hover:bg-red-600 text-white'><span className='hidden sm:block'>Delete</span><span className="block sm:hidden"><DeleteForeverIcon  fontSize='small' className="0.5"/></span></button></div>
        </div>
     </div>)}
     




    </div>
  )
}

export default TableJobPost