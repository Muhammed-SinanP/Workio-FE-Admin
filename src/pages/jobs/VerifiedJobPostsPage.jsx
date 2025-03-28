import React, { useEffect, useState } from 'react'
import useFetch from '../../hooks/useFetch'
import JobPostsTable from '../../components/tables/JobPostsTable'
import PaginationBtn from '../../components/buttons/PaginationBtn'
import { useForm } from 'react-hook-form'
import SortDiv from '../../components/SortDiv'
import ErrorDiv from '../../components/ErrorDiv'
import LoadingBars from '../../components/loading/LoadingBars'

const VerifiedJobPostsPage = () => {
  const [refresh,setRefresh] = useState(false)
  const [pageNo, setPageNo] = useState(0)
      const [jobsPerPage, setJobsPerPage] = useState(10)
      const [verifiedJobPosts,setVerifiedJobPosts] = useState(null)
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
  const [verifiedJobPostsData, verifiedJobPostsError, verifiedJobPostsLoading] = useFetch(`/admin/jobPosts/verified?sortCriteria=${sortCriteria}&sortOrder=${sortOrder}&jobsPerPage=${jobsPerPage}&pageNo=${pageNo+1}`,[refresh])
  function refreshPage() {
    setRefresh(!refresh)
  }
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

    useEffect(()=>{
      if(verifiedJobPostsData){
      setVerifiedJobPosts(verifiedJobPostsData.jobPosts)
      setPageCount(verifiedJobPostsData.totalPages)
      setSkipSNo(pageNo*jobsPerPage)
      }
    },[verifiedJobPostsData])
  
  return (
    <div className=''>
    <div className='heading'>Verified Job Posts</div>
    <div className='main-div'> 
      {verifiedJobPostsError?
      <ErrorDiv info={"Error fetching job posts."}/>
      :
      !verifiedJobPosts?
            <div className='loading-page'><LoadingBars /></div> :
          <div className='flex flex-col gap-4'>  <SortDiv register={register} sortCriteria={sortCriteria} />
              <JobPostsTable posts={verifiedJobPosts} condition={"verified"} refreshPage={refreshPage} isLoading={verifiedJobPostsLoading} skipSNo={skipSNo} />
          </div>
    }
        {verifiedJobPosts && verifiedJobPosts.length > 0 && <div><PaginationBtn handlePageClick={handlePageClick} pageNo={pageNo} pageCount={pageCount} /></div>}
    </div>


  </div>
  )
}

export default VerifiedJobPostsPage