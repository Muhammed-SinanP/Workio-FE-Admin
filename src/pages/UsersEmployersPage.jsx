import React, { useState } from "react";
import useFetch from "../hooks/useFetch";
import TableUser from "../components/table/TableUser";
import UsersTable from "../components/table/UsersTable";

const UsersEmployersPage = () => {
  const [refresh, setRefresh] = useState(false);
  const [allEmployers, error, loading] = useFetch("/admin/users/employer", [
    refresh,
  ]);

  return (
    <div className="">
      <div className="heading">All Employers</div>
      <div className="main-div">
        <UsersTable users={allEmployers} userRole={"employer"} />
        {/* <TableUser data={allEmployers} refresh={refresh} setRefresh={setRefresh} headColor={"bg-purple-500" } userRole={"employer"}/> */}
      </div>
    </div>
  );
}

export default UsersEmployersPage