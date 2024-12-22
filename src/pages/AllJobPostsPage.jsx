import React, { useState } from 'react'
import useFetch from '../hooks/useFetch'
import TableJobPost from '../components/table/TableJobPost'

const AllJobPostsPage = () => {
  const [refresh,setRefresh] = useState(false)
  const [allJobPosts,error,loading] = useFetch("/admin/allJobPosts",[refresh])
  return (
    <div className='outerDiv'>
      <div className='heading'>All Job Posts</div>
      <div className='my-8'>
        
        <TableJobPost data={allJobPosts} refresh={refresh} setRefresh={setRefresh} headColor="bg-teal-500" condition={"none"}/>
      </div>


    </div>
  )
}

export default AllJobPostsPage