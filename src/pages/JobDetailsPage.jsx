import React from 'react'
import { useParams } from 'react-router-dom'
import useFetch from '../hooks/useFetch'

const JobDetailsPage = () => {
    const params = useParams()
    const jobId = params.jobId
    console.log(jobId)
    const [job,error,loading] = useFetch(`/admin/jobPost/${jobId}`)
    console.log(job)

   function calculateDate(createdDate){
    const d = new Date(createdDate)
    const date = d.getDate()
    const month = d.getMonth()
    const year = d.getFullYear()

    return `${date}-${month}-${year}`
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
        
        {job.verified===true?"":<button className='btn btn-xs md:btn-sm border-none bg-green-400 text-white hover:bg-green-500'>Approve</button>}
        <button className='btn btn-xs md:btn-sm  border-none bg-red-500 hover:bg-red-600 text-white'>Delete</button>
    </div>
   </div>}
    </div>
  )
}

export default JobDetailsPage