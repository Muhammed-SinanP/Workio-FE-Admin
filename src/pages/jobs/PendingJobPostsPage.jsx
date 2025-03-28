import React, { useEffect, useState } from 'react'
import useFetch from '../../hooks/useFetch'

import JobPostsTable from '../../components/tables/JobPostsTable'

import PaginationBtn from '../../components/buttons/PaginationBtn'
import SortDiv from '../../components/SortDiv'
import { useForm } from 'react-hook-form'
import ErrorDiv from '../../components/ErrorDiv'
import LoadingBars from '../../components/loading/LoadingBars'

const PendingJobPostsPage = () => {
  const [refresh,setRefresh] = useState(false)
  const [pageNo, setPageNo] = useState(0)
    const [jobsPerPage, setJobsPerPage] = useState(10)
    const [pendingJobPosts,setPendingJobPosts] = useState(null)
    const [pageCount, setPageCount] = useState(1)
   const [skipSNo,setSkipSNo] = useState(0)
  const { register, watch } = useForm({
      defaultValues:{
      sortCriteria: "date",
      sortOrder: "desc"
      }
    })
    const sortCriteria = watch("sortCriteria")
    const sortOrder = watch("sortOrder")
  const [pendingJobPostsData, pendingJobPostsError, pendingJobPostsLoading] = useFetch(`/admin/jobPosts/pending?sortCriteria=${sortCriteria}&sortOrder=${sortOrder}&jobsPerPage=${jobsPerPage}&pageNo=${pageNo+1}`,[refresh])
  function refreshPage() {
    setRefresh(!refresh)
  }

  useEffect(()=>{
    if(pendingJobPostsData){
      setPendingJobPosts(pendingJobPostsData.jobPosts)
      setPageCount(pendingJobPostsData.totalPages)
      setSkipSNo(pageNo * jobsPerPage)
    }
  },[pendingJobPostsData])

  function handlePageClick(e) {
    setPageNo(e.selected);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  useEffect(()=>{
      setPageNo(0)
    },[sortCriteria,sortOrder])

  return (
    <div className=''>
    <div className='heading'>Pending Job Posts</div>
    <div className='main-div'> 
       {pendingJobPostsError?
       <ErrorDiv info={"Error fetching job posts."}/>
       :
        !pendingJobPosts?
            <div className='loading-page'><LoadingBars /></div> :
          <div className='flex flex-col gap-4'>  <SortDiv register={register} sortCriteria={sortCriteria} />
             <JobPostsTable posts={pendingJobPosts} condition={"pending"} refreshPage={refreshPage} isLoading={pendingJobPostsLoading} skipSNo={skipSNo}/>
             </div>
       }

        {pendingJobPosts && pendingJobPosts.length > 0 && <div><PaginationBtn handlePageClick={handlePageClick} pageNo={pageNo} pageCount={pageCount} /></div>}
       
    </div>


  </div>
  )
}

export default PendingJobPostsPage