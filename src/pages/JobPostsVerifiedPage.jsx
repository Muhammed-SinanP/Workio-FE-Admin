import React, { useState } from 'react'
import useFetch from '../hooks/useFetch'
import TableJobPost from '../components/table/TableJobPost'
import JobPostsTable from '../components/table/JobPostsTable'

const JobPostsVerifiedPage = () => {
  const [refresh,setRefresh] = useState(false)
  const [verifiedJobPosts,error,loading] = useFetch("/admin/allJobPosts/verified",[refresh])
  return (
    <div className=''>
    <div className='heading'>Verified Job Posts</div>
    <div className='main-div'> 
        <JobPostsTable posts={verifiedJobPosts} condition={"verified"} />
      {/* <TableJobPost data={verifiedJobPosts} refresh={refresh} setRefresh={setRefresh}  headColor="bg-cyan-500" condition={"verified"}/> */}
    </div>


  </div>
  )
}

export default JobPostsVerifiedPage