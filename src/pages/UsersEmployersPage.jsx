import React, { useState } from "react";
import useFetch from "../hooks/useFetch";
import TableUser from "../components/table/TableUser";

const UsersEmployersPage = () => {
  const [refresh, setRefresh] = useState(false);
  const [allEmployers, error, loading] = useFetch("/admin/users/employer", [
    refresh,
  ]);

  return (
    <div className="outerDiv">
      <div className="heading">All Employers</div>
      <div className="my-8">
        <TableUser data={allEmployers} refresh={refresh} setRefresh={setRefresh} headColor={"bg-purple-500" } userRole={"employer"}/>
      </div>
    </div>
  );
}

export default UsersEmployersPage