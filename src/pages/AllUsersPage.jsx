import React, { useState } from "react";
import useFetch from "../hooks/useFetch";
import TableUser from "../components/table/TableUser";

const AllUsersPage = () => {
  const [refresh, setRefresh] = useState(false);
  const [allUsers, error, loading] = useFetch("/admin/users", [
    refresh,
  ]);

  return (
    <div className="outerDiv">
      <div className="heading">All Users</div>
      <div className="my-8">
        <TableUser data={allUsers} refresh={refresh} setRefresh={setRefresh} headColor={"bg-indigo-500"} userRole={"all"}/>
      </div>
    </div>
  );
};

export default AllUsersPage;
