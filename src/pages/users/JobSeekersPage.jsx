import React, { useEffect, useState } from "react";
import useFetch from "../../hooks/useFetch";
import UsersTable from "../../components/tables/UsersTable";
import PaginationBtn from "../../components/buttons/PaginationBtn";
import { useForm } from "react-hook-form";
import SortDiv from "../../components/SortDiv";
import ErrorDiv from "../../components/ErrorDiv";
import LoadingBars from "../../components/loading/LoadingBars";

const JobSeekersPage = () => {
  const [refresh, setRefresh] = useState(false);
  const [pageNo, setPageNo] = useState(0)
  const [usersPerPage, setUsersPerPage] = useState(10)
  const [pageCount, setPageCount] = useState(1)
  const [allJobSeekers, setAllJobSeekers] = useState(null)
  const [skipSNo, setSkipSNo] = useState(0)
  const { register, watch } = useForm({
    defaultValues: {
      sortCriteria: "date",
      sortOrder: "desc"
    }
  })
  const sortCriteria = watch("sortCriteria")
  const sortOrder = watch("sortOrder")
  const [allJobSeekersData, allJobSeekersError, allJobSeekersLoading] = useFetch(`/admin/users/job_seeker?sortCriteria=${sortCriteria}&sortOrder=${sortOrder}&usersPerPage=${usersPerPage}&pageNo=${pageNo + 1}`, [
    refresh,
  ]);
  function refreshPage() {
    setRefresh(!refresh)
  }
  useEffect(() => {
    if (allJobSeekersData) {
      setAllJobSeekers(allJobSeekersData.users)
      setPageCount(allJobSeekersData.totalPages)
      setSkipSNo(usersPerPage * pageNo)
    }
  }, [allJobSeekersData])

  function handlePageClick(e) {
    setPageNo(e.selected);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  useEffect(() => {
    setPageNo(0)
  }, [sortCriteria, sortOrder])


  return (
    <div className="">
      <div className="heading">All Job Seekers</div>
      <div className="main-div">
        {allJobSeekersError ?
          <ErrorDiv info={"Error fetching users data."} />
          :
          !allJobSeekers ?
            <div className='loading-page'><LoadingBars /></div> :
            <div className='flex flex-col gap-4'>  <SortDiv register={register} sortCriteria={sortCriteria} />
              <UsersTable users={allJobSeekers} userRole={"job_seeker"} refreshPage={refreshPage} isLoading={allJobSeekersLoading} skipSNo={skipSNo} />
            </div>
        }
        {allJobSeekers && allJobSeekers.length > 0 && <div><PaginationBtn handlePageClick={handlePageClick} pageNo={pageNo} pageCount={pageCount} /></div>}
      </div>
    </div>
  );
}

export default JobSeekersPage