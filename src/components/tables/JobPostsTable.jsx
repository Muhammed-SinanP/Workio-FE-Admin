import { useConfirm } from 'material-ui-confirm'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { axiosInstance } from '../../config/axiosInstance'
import { formatDatetoString } from '../../utils/date'

const JobPostsTable = ({posts, condition , refreshPage , isLoading ,skipSNo}) => {
    const confirm = useConfirm()
    const navigate = useNavigate()

    function handleApproval(jobId, jobTitle, employer) {
       toast.dismiss()
        async function approveJob() {
            const loading = toast.loading("Approving job")
            try {
                const response = await axiosInstance({
                    method: "PUT",
                    url: `/admin/jobPost/${jobId}`,
                })
                if (response.status === 200) {
                    toast.dismiss(loading)
                    toast.success("Job approved successfully")
                    refreshPage()
                }else{
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
            description: `Approving '${jobTitle}' posted by ${employer}, this can't be undone`,
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
                    toast.success("Job deleted successfully")
                    refreshPage()
                }else{
                    toast.dismiss(loading)
                    toast.error("Job deletion failed")
                }
            } catch (err) {
                toast.dismiss(loading)
                toast.error("Job deletion failed")
            }
        }

        confirm({
            title: "Confirm job deletion",
            description: `Deleting '${jobTitle}' posted by ${employer}, this can't be undone`,
            confirmationText: "Confirm"
        })
            .then(() => {
                deleteJob()
            })
    }


    
  return (
      <table className={`grid ${isLoading?"opacity-50":"opacity-100"} grid-cols-12 border border-b-0 truncate rounded-md text-xs sm:text-sm bg-white dark:bg-dark-text`}>
          <thead className='col-span-12  border-b bg-brand-dark text-white'>
              <tr className='grid grid-cols-12 '>
                  <th className='col-span-2 sm:col-span-1  text-start p-1'><span className='hidden sm:inline-block'>S.</span>No.</th>
                  <th className='col-span-10 sm:col-span-3  text-start p-1'>Job Title</th>
                  
                  <th className='sm:col-span-3 text-start p-1 hidden sm:block'>Employer</th>
                  {condition === "none" && <th className='col-span-3 hidden sm:block text-start p-1'>Verification</th>}
                  <th className='col-span-2 hidden sm:block text-start p-1'>Action</th>
              </tr>
          </thead>
          <tbody className='col-span-12 text-xs'>
              {posts && posts.length > 0 ? posts.map((post, index) =>

                  <tr className='grid grid-cols-12 border-b' key={index}>
                      <td className='col-span-2 sm:col-span-1  text-start p-1'>{index + skipSNo + 1 }</td>
                      <td className='col-span-10 sm:col-span-3 truncate text-start p-1 '>
                          <div>
                            <p>{post.title}</p>
                            <p className='text-xxs'>[{formatDatetoString(post.createdAt)}]</p>
                            </div>
                          <div className='sm:hidden'>{post.employer.name}</div>
                          <div className='sm:hidden'>{post.employer.email}</div>
                          <div className='sm:hidden flex gap-1'>
                              <button onClick={() => navigate(`/jobPost/${post._id}`)} className='btn btn-xs text-xxs text-white bg-yellow-500 border-none hover:bg-yellow-500'>Check</button>
                              {!post.verified && <button onClick={() => handleApproval(post._id, post.title, post.employer.name)} className='btn btn-xs text-xxs text-white bg-green-500 border-none hover:bg-green-500'>Approve</button>}
                              <button onClick={() => handleDelete(post._id, post.title, post.employer.name)} className='btn btn-xs text-xxs text-white bg-red-500 border-none hover:bg-red-500'>Delete</button>
                          </div>

                      </td>
                      <td className='sm:col-span-3 truncate text-start p-1 hidden sm:block'>
                        
                          <div>{post.employer.name}</div>
                        <div>{post.employer.email}</div>
                        </td>
                      {condition === "none" && <td className={`col-span-3 hidden sm:block text-start p-1 ${post.verified===true?"text-green-600":"text-yellow-600"}`}>{post.verified ? "Verified" : "Pending"}</td>}
                      <td className='col-span-2 hidden sm:flex text-start p-1 flex-col gap-1 items-start'>
                          <button onClick={() => navigate(`/jobPost/${post._id}`)} className='btn btn-xs text-xxs text-white bg-yellow-500 border-none hover:bg-yellow-500'>Check</button>
                          {!post.verified && <button onClick={() => handleApproval(post._id, post.title, post.employer.name)} className='btn btn-xs text-xxs text-white bg-green-500 border-none hover:bg-green-500'>Approve</button>}
                          <button onClick={() => handleDelete(post._id, post.title, post.employer.name)} className='btn btn-xs text-xxs text-white bg-red-500 border-none hover:bg-red-500'>Delete</button>
                        </td>
                  </tr>

                  

              )
                  :

                  <tr className='grid grid-cols-12 border-b'>
                    <td className='col-span-12 text-center p-1'> No data available.</td>
                  </tr>
            
            
            }
          </tbody>
      </table>
  )
}

export default JobPostsTable