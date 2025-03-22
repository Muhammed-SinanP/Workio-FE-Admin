import React, { useState } from 'react'
import useFetch from '../hooks/useFetch'
import TableJobPost from '../components/table/TableJobPost'
import JobPostsTable from '../components/table/JobPostsTable'

const JobPostsPendingPage = () => {
  const [refresh,setRefresh] = useState(false)
  const [pendingJobPosts,error,loading] = useFetch("/admin/allJobPosts/pending",[refresh])
  return (
    <div className=''>
    <div className='heading'>Pending Job Posts</div>
    <div className='main-div'> 
        <JobPostsTable posts={pendingJobPosts} condition={"pending"} />
      {/* <TableJobPost data={pendingJobPosts} refresh={refresh} setRefresh={setRefresh}  headColor="bg-blue-500" condition={"pending"}/> */}
    </div>


  </div>
  )
}

export default JobPostsPendingPage