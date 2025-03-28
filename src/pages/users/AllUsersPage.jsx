import React, { useEffect, useState } from "react";
import useFetch from "../../hooks/useFetch";
import UsersTable from "../../components/tables/UsersTable";
import PaginationBtn from "../../components/buttons/PaginationBtn";
import SortDiv from "../../components/SortDiv";
import { useForm } from "react-hook-form";
import ErrorDiv from "../../components/ErrorDiv";
import LoadingBars from "../../components/loading/LoadingBars";

const AllUsersPage = () => {
  const [refresh, setRefresh] = useState(false);
  const [pageNo, setPageNo] = useState(0)
  const [usersPerPage, setUsersPerPage] = useState(10)
  const [pageCount, setPageCount] = useState(1)
  const [allUsers, setAllUsers] = useState(null)
  const [skipSNo, setSkipSNo] = useState(0)
  const { register, watch } = useForm({
    defaultValues: {
      sortCriteria: "date",
      sortOrder: "desc"
    }
  })
  const sortCriteria = watch("sortCriteria")
  const sortOrder = watch("sortOrder")
  const [allUsersData, allUsersError, allUserLoading] = useFetch(`/admin/users/all?sortCriteria=${sortCriteria}&sortOrder=${sortOrder}&usersPerPage=${usersPerPage}&pageNo=${pageNo + 1}`, [
    refresh,
  ]);
  function refreshPage() {
    setRefresh(!refresh)
  }
  useEffect(() => {
    if (allUsersData) {
      setAllUsers(allUsersData.users)
      setPageCount(allUsersData.totalPages)
      setSkipSNo(usersPerPage * pageNo)
    }
  }, [allUsersData])

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
      <div className="heading">All Users</div>
      <div className="main-div">
        {allUsersError ?
          <ErrorDiv info={"Error fetching users data."} />
          :
          !allUsers ?
            <div className='loading-page'><LoadingBars /></div> :
            <div className='flex flex-col gap-4'>
              <SortDiv register={register} sortCriteria={sortCriteria} />
              <UsersTable users={allUsers} userRole={"all"} refreshPage={refreshPage} isLoading={allUserLoading} skipSNo={skipSNo} />
            </div>
        }
        {allUsers && allUsers.length > 0 && <div><PaginationBtn handlePageClick={handlePageClick} pageNo={pageNo} pageCount={pageCount} /></div>}
      </div>
    </div>
  );
};

export default AllUsersPage;
