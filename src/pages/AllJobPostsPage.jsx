import React, { useState } from 'react'
import useFetch from '../hooks/useFetch'
import TableJobPost from '../components/table/TableJobPost'
import JobPostsTable from '../components/table/JobPostsTable'

const AllJobPostsPage = () => {
  const [refresh,setRefresh] = useState(false)
  const [allJobPosts,error,loading] = useFetch("/admin/allJobPosts",[refresh])
  return (
    <div className=''>
      <div className='heading'>All Job Posts</div>
      <div className='main-div'>
        <JobPostsTable posts={allJobPosts} condition={"none"}/>
        
        {/* <TableJobPost data={allJobPosts} refresh={refresh} setRefresh={setRefresh} headColor="bg-teal-500" condition={"none"}/> */}
      </div>


    </div>
  )
}

export default AllJobPostsPage