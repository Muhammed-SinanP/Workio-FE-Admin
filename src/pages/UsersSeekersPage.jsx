import React, { useState } from "react";
import useFetch from "../hooks/useFetch";
import TableUser from "../components/table/TableUser";

const UsersSeekersPage = () => {
  const [refresh, setRefresh] = useState(false);
  const [allJobSeekers, error, loading] = useFetch("/admin/users/job_seeker", [
    refresh,
  ]);

  return (
    <div className="outerDiv">
      <div className="heading">All Job Seekers</div>
      <div className="my-8">
        <TableUser data={allJobSeekers} refresh={refresh} setRefresh={setRefresh} headColor={"bg-violet-500"} userRole={"job_seeker"}/>
      </div>
    </div>
  );
}

export default UsersSeekersPage