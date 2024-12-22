import React, { useState } from 'react'
import useFetch from '../hooks/useFetch'
import TableJobPost from '../components/table/TableJobPost'

const JobPostsVerifiedPage = () => {
  const [refresh,setRefresh] = useState(false)
  const [verifiedJobPosts,error,loading] = useFetch("/admin/allJobPosts/verified",[refresh])
  return (
    <div className='outerDiv'>
    <div className='heading'>Verified Job Posts</div>
    <div className='my-8'> 
      <TableJobPost data={verifiedJobPosts} refresh={refresh} setRefresh={setRefresh}  headColor="bg-cyan-500" condition={"verified"}/>
    </div>


  </div>
  )
}

export default JobPostsVerifiedPage