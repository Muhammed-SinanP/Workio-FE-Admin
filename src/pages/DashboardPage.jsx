import React, { useEffect } from "react";
import useFetch from "../hooks/useFetch";
import GroupIcon from "@mui/icons-material/Group";
import CountCard from "../components/CountCard";

import PersonIcon from '@mui/icons-material/Person';

import PersonSearchIcon from '@mui/icons-material/PersonSearch';
import WorkIcon from '@mui/icons-material/Work';
import FactCheckIcon from '@mui/icons-material/FactCheck';
import WorkHistoryIcon from '@mui/icons-material/WorkHistory';
import ContactPageIcon from '@mui/icons-material/ContactPage';


const DashboardPage = () => {
  const [allUsers, allUsersError, allUsersLoading] = useFetch("/admin/users");
  const [allJobSeekers, allJobSeekersError, allJobSeekersLoading] = useFetch("/admin/users/job_seeker");
  const [allEmployers, allEmployersError, allEmployersLoading] = useFetch("/admin/users/employer");

  const [allJobPosts, allJobPostsError, allJobPostsLoading] = useFetch("/admin/allJobPosts")
  const [verifiedJobPosts, verifiedJobPostsError, verifiedJobPostsLoading] = useFetch("/admin/allJobPosts/verified")
  const [pendingJobPosts, pendingJobPostsError, pendingJobPostsLoading] = useFetch("/admin/allJobPosts/pending")

  const [allApplications, allApplicationsError, allApplicationsLoading] = useFetch("/admin/allApplications")


  return (
    <div className="">
      <div className="heading">Dashboard</div>
      <div className="grid grid-cols-12 gap-y-2 sm:gap-y-4 main-div">
        <div className="col-span-12  grid gap-2 sm:gap-4 xl:gap-8 2xl:gap-16 grid-cols-12">

          <CountCard icon={<GroupIcon />} title="Total Users" count={allUsersLoading ? null : allUsers?.length >= 0 ? allUsers.length : "N.D"} bgColor="bg-brand" path={"/allUsers"} />
          <CountCard icon={<PersonSearchIcon />} title="Job Seekers" count={allJobSeekersLoading ? null : allJobSeekers?.length >= 0 ? allJobSeekers.length : "N.D"} bgColor="bg-teal-600" path={"/allJobSeekers"} />
          <CountCard icon={<PersonIcon />} title="Employers" count={allEmployersLoading ? null : allEmployers?.length >= 0 ? allEmployers.length : "N.D"} bgColor="bg-blue-600" path={"/allEmployers"} />
        </div>
        <div className="col-span-12  grid gap-2 sm:gap-4 xl:gap-8 2xl:gap-16 grid-cols-12">
          <CountCard icon={<WorkIcon />} title="Total Job Posts" count={allJobPostsLoading ? null : allJobPosts?.length >= 0 ? allJobPosts.length : "N.D"} bgColor="bg-teal-500" path={"/allJobPosts"} />
          <CountCard icon={<FactCheckIcon />} title="Verified Job Posts" count={verifiedJobPostsLoading ? null : verifiedJobPosts?.length >= 0 ? verifiedJobPosts.length : "N.D"} bgColor="bg-green-600 " path={"/jobPosts/verified"} />
          <CountCard icon={<WorkHistoryIcon />} title="Pending Job Posts" count={pendingJobPostsLoading ? null : pendingJobPosts?.length >= 0 ? pendingJobPosts.length : "N.D"} bgColor="bg-yellow-500 " path={"/jobPosts/pending"} />
        </div>
        <div className="col-span-12  grid gap-2 sm:gap-4 xl:gap-8 2xl:gap-16 grid-cols-12">
          <CountCard icon={<ContactPageIcon />} title="Total Job Applications" count={allApplicationsLoading ? null : allApplications?.length >= 0 ? allApplications.length : "N.D"} bgColor="bg-blue-500" path={undefined} />

        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
