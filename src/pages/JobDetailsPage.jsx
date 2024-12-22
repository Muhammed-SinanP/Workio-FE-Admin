import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import useFetch from '../hooks/useFetch'
import { axiosInstance } from '../config/axiosInstance'
import toast from 'react-hot-toast'
import { useConfirm } from 'material-ui-confirm'

const JobDetailsPage = () => {
    const confirm = useConfirm()
    const [refresh,setRefresh] = useState(false)
    const params = useParams()
    const jobId = params.jobId
    console.log(jobId)
    const [job,error,loading] = useFetch(`/admin/jobPost/${jobId}`,[refresh])
    console.log(job)

   function calculateDate(createdDate){
    const d = new Date(createdDate)
    const date = d.getDate()
    const month = d.getMonth()
    const year = d.getFullYear()

    return `${date}-${month}-${year}`
   }

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
    <div className='outerDiv'>
   <div className='heading'>Job details of {job? job.title:"N.D"} posted by {job ? job.employer.name:"N.D"}</div>
   {job&&<div className='my-8 flex flex-col gap-1'>
    <div className='grid grid-cols-12 gap-2'>
        <div className='col-span-3 font-medium flex justify-between'><span>Title</span><span>:</span></div>
        <div className='col-span-9'>{job.title}</div>
    </div>
    <div className='grid grid-cols-12 gap-2'>
        <div className='col-span-3 font-medium flex justify-between'><span>Employer</span><span>:</span></div>
        <div className='col-span-9'>{job.employer.name}</div>
    </div>
    <div className='grid grid-cols-12 gap-2'>
        <div className='col-span-3 font-medium flex justify-between'><span>Verification</span><span>:</span></div>
        <div className={`col-span-9 ${job.verified===true?"text-green-600":"text-yellow-600"}`}>{job.verified===true?"Approved":"Pending"}</div>
    </div>
    <div className='grid grid-cols-12 gap-2'>
        <div className='col-span-3 font-medium flex justify-between'><span>Location</span><span>:</span></div>
        <div className='col-span-9'>
            {job.location.city},{""} {job.location.state},{""} {job.location.country}
        </div>
    </div>
    <div className='grid grid-cols-12 gap-2'>
        <div className='col-span-3 font-medium flex justify-between'><span>Sallary</span><span>:</span></div>
        <div className='col-span-9'>{job.sallaryRange.min} - {job.sallaryRange.max} LPA</div>
    </div>
    <div className='grid grid-cols-12 gap-2'>
        <div className='col-span-3 font-medium flex justify-between'><span>Status</span><span>:</span></div>
        <div className='col-span-9'>{job.status}</div>
    </div>
    <div className='grid grid-cols-12 gap-2'>
        <div className='col-span-3 font-medium flex justify-between'><span>Job type</span><span>:</span></div>
        <div className='col-span-9'>{job.jobType}</div>
    </div>
    <div className='grid grid-cols-12 gap-2'>
        <div className='col-span-3 font-medium flex justify-between'><span>Work model</span><span>:</span></div>
        <div className='col-span-9'>{job.workModel}</div>
    </div>
    <div className='grid grid-cols-12 gap-2'>
        <div className='col-span-3 font-medium flex justify-between'><span>Description</span><span>:</span></div>
        <div className='col-span-9'>{job.description}</div>
    </div>
    <div className='grid grid-cols-12 gap-2'>
        <div className='col-span-3 font-medium flex justify-between'><span>Requirements</span><span>:</span></div>
        <div className='col-span-9'>{job.requirements}</div>
    </div>
    <div className='grid grid-cols-12 gap-2'>
        <div className='col-span-3 font-medium flex justify-between'><span>Created at</span><span>:</span></div>
        <div className='col-span-9'>{calculateDate(job.createdAt)} <span className='text-xs font-extralight'>(DD-MM-YYYY)</span></div>
    </div>
    <div className='flex mt-6 gap-4 '>
        
        {job.verified===true?"":<button onClick={()=>handleApproval(job._id,job.title,job.employer.name)} className='btn btn-xs md:btn-sm border-none bg-green-400 text-white hover:bg-green-500'>Approve</button>}
        <button onClick={()=>handleDelete(job._id,job.title,job.employer.name)} className='btn btn-xs md:btn-sm  border-none bg-red-500 hover:bg-red-600 text-white'>Delete</button>
    </div>
   </div>}
    </div>
  )
}

export default JobDetailsPage