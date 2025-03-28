import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import useFetch from '../../hooks/useFetch'
import { axiosInstance } from '../../config/axiosInstance'
import toast from 'react-hot-toast'
import { useConfirm } from 'material-ui-confirm'
import { useNavigate } from "react-router-dom"
import ErrorDiv from '../../components/ErrorDiv'
import { formatDatetoString } from '../../utils/date'
import LoadingBars from '../../components/loading/LoadingBars'

const JobDetailsPage = () => {
  const confirm = useConfirm()
  const [refresh, setRefresh] = useState(false)
  const params = useParams()
  const jobId = params.jobId
  const navigate = useNavigate()

  const [job, jobError, jobLoading] = useFetch(`/admin/jobPost/${jobId}`, [refresh])

  function handleApproval(jobId, jobTitle, employer) {
    toast.dismiss()
    async function approveJob() {
      const loading = toast.loading("Approving job")
      try {
        const response = await axiosInstance({
          method: "PUT",
          url: `/admin/jobPost/${jobId}`
        })
        if (response.status === 200) {
          toast.dismiss(loading)
          toast.success("Job approved successfully")
          setRefresh(!refresh)
        } else {
          toast.dismiss(loading)
          toast.error("Job approval failed")
        }
      } catch (err) {
        toast.dismiss(loading)
        toast.error("Job approval failed")
      }
    }

    confirm({
      title: "Confirm job approval",
      description: `Approving ${jobTitle} by ${employer}, this can't be undone`,
      confirmationText: "Confirm"
    })
      .then(() => {
        approveJob()
      })
  }

  function handleDelete(jobId, jobTitle, employer) {
    toast.dismiss()
    async function deleteJob() {
      const loading = toast.loading("Deleting job")
      try {
        const response = await axiosInstance({
          method: "DELETE",
          url: `/admin/jobPost/${jobId}`
        })
        if (response.status === 200) {
          toast.dismiss(loading)
          toast.success("Job deleted")
          navigate(-1)
        }else{
          toast.dismiss(loading)
          toast.error("Job deletion failed")
        }
      } catch (err) {
        toast.error("Job deletion failed")
      }
    }

    confirm({
      title: "Confirm job deletion",
      description: `Deleting ${jobTitle} by ${employer}, this can't be undone`,
      confirmationText: "Confirm"
    })
      .then(() => {
        deleteJob()
      })
  }

  if (jobError) {
    return (
      <ErrorDiv info={"Error fetching job details."} />
    )
  }
  return (
    jobLoading ?
      <div>
        <div className='heading'><span className='invisible'>a</span></div>
        <div className='min-h-screen flex justify-center items-center'> <LoadingBars /></div>
      </div>

      :

      <div className='dark:text-dark-text'>
        <div className='heading'>Job details of {job ? job.title : "N.D"} posted by {job ? job.employer.name : "N.D"}</div>
        <div className='main-div flex flex-col gap-2 text-sm tracking-wide'>
          <div>
            <p className="jobDetails-heading">Title</p>
            <p className="jobDetails-content ">{job.title}</p>
          </div>
          <div>
            <p className="jobDetails-heading">Employer</p>
            <p className="jobDetails-content ">{job.employer.name}</p>
          </div>
          <div>
            <p className="jobDetails-heading">Verification</p>
            <p className="jobDetails-content ">{job.verified === true ? "Approved" : "Pending"}</p>
          </div>
          <div>
            <p className="jobDetails-heading">Location</p>
            <p className="jobDetails-content ">{job.location.city}, {job.location.state}, {job.location.country}</p>
          </div>
          <div>
            <p className="jobDetails-heading">Salary</p>
            <p className="jobDetails-content ">{job.salaryRange.min}-{job.salaryRange.max} <span className='font-light tracking-wider'>LPA</span></p>
          </div>
          <div>
            <p className="jobDetails-heading">Status</p>
            <p className="jobDetails-content ">{job.status}</p>
          </div>
          <div>
            <p className="jobDetails-heading">Job type</p>
            <p className="jobDetails-content ">{job.jobType}</p>
          </div>
          <div>
            <p className="jobDetails-heading">Work model</p>
            <p className="jobDetails-content ">{job.workModel}</p>
          </div>
          <div>
            <p className="jobDetails-heading">Description</p>
            <p className="jobDetails-content normal-case">{job.description}</p>
          </div>
          <div>
            <p className="jobDetails-heading">Requirements</p>
            <ul className='list-disc jobDetails-content'>
              {job.requirements.map((requirement, index) =>
                <li className='jobDetails-content normal-case' key={index}>{requirement}</li>
              )}
            </ul>
          </div>
          <div>
            <p className="jobDetails-heading">Created at</p>
            <p className="jobDetails-content ">{formatDatetoString(job.createdAt)}</p>
          </div>
          <div className='flex gap-2 mt-4'>{!job.verified && <button onClick={() => handleApproval(job._id, job.title, job.employer.name)} className='btn btn-xs border-none bg-green-500 hover:bg-green-500 text-white capitalize'>Approve job</button>}
            <button onClick={() => handleDelete(job._id, job.title, job.employer.name)} className='btn btn-xs border-none bg-red-500 hover:bg-red-500 text-white capitalize'>Delete job</button>
          </div>
        </div>
      </div>

  )
}

export default JobDetailsPage