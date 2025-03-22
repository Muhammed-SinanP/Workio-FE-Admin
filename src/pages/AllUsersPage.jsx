import React, { useState } from "react";
import useFetch from "../hooks/useFetch";
import TableUser from "../components/table/TableUser";
import UsersTable from "../components/table/UsersTable";

const AllUsersPage = () => {
  const [refresh, setRefresh] = useState(false);
  const [allUsers, allUsersError, allUserLoading] = useFetch("/admin/users", [
    refresh,
  ]);
function refreshPage(){
  setRefresh(!refresh)
}
  return (
    <div className="">
      <div className="heading">All Users</div>
      <div className="main-div">
         <UsersTable users={allUsers} refreshPage={refreshPage} />
        {/* <TableUser data={allUsers} refresh={refresh} setRefresh={setRefresh} headColor={"bg-indigo-500"} userRole={"all"}/> */}
      </div>
    </div>
  );
};

export default AllUsersPage;
