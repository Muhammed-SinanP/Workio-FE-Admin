import React, { useEffect, useState } from 'react'
import useFetch from '../../hooks/useFetch'
import JobPostsTable from '../../components/tables/JobPostsTable'
import PaginationBtn from '../../components/buttons/PaginationBtn'
import SortDiv from '../../components/SortDiv'
import { useForm } from "react-hook-form"
import ErrorDiv from '../../components/ErrorDiv'
import LoadingBars from '../../components/loading/LoadingBars'

const AllJobPostsPage = () => {
  const [refresh, setRefresh] = useState(false)
  const [pageNo, setPageNo] = useState(0)
  const [jobsPerPage, setJobsPerPage] = useState(10)
  const [pageCount, setPageCount] = useState(1)
  const [allJobPosts, setAllJobPosts] = useState(null)
  const [skipSNo,setSkipSNo] = useState(0)
  const { register, watch } = useForm({
    defaultValues: {
      sortCriteria: "date",
      sortOrder: "desc"
    }
  })
  const sortCriteria = watch("sortCriteria")
  const sortOrder = watch("sortOrder")
  const [jobPostsData, allJobPostsError, allJobPostsLoading] = useFetch(`/admin/jobPosts/all?sortCriteria=${sortCriteria}&sortOrder=${sortOrder}&pageNo=${pageNo+1}&jobsPerPage=${jobsPerPage}`, [refresh])

  useEffect(() => {
    if (jobPostsData) {
      setAllJobPosts(jobPostsData.jobPosts)
      setPageCount(jobPostsData.totalPages)
      setSkipSNo(pageNo*jobsPerPage)
    }
  }, [jobPostsData])

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

  return (
    <div className=''>
      <div className='heading'>All Job Posts</div>
      <div className='main-div'>
        {allJobPostsError ?
          <ErrorDiv info={"Error fetching job posts."} />
          :
          !allJobPosts ?
           <div className='loading-page'><LoadingBars/></div>  :
            <div className='flex flex-col gap-4'>  <SortDiv register={register} sortCriteria={sortCriteria} />
              <JobPostsTable posts={allJobPosts} condition={"none"} refreshPage={refreshPage} isLoading={allJobPostsLoading} skipSNo={skipSNo}/>
            </div>
        }
        {allJobPosts && allJobPosts.length > 0 && <div><PaginationBtn handlePageClick={handlePageClick} pageNo={pageNo} pageCount={pageCount} /></div>}
      </div>


    </div>
  )
}

export default AllJobPostsPage