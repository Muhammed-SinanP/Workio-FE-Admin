import React, { useState } from 'react'
import useFetch from '../hooks/useFetch'
import TableJobPost from '../components/table/TableJobPost'

const JobPostsPendingPage = () => {
  const [refresh,setRefresh] = useState(false)
  const [pendingJobPosts,error,loading] = useFetch("/admin/allJobPosts/pending",[refresh])
  return (
    <div className='outerDiv'>
    <div className='heading'>Pending Job Posts</div>
    <div className='my-8'> 
      <TableJobPost data={pendingJobPosts} refresh={refresh} setRefresh={setRefresh}  headColor="bg-blue-500" condition={"pending"}/>
    </div>


  </div>
  )
}

export default JobPostsPendingPage