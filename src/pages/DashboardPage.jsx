import React, { useEffect } from "react";
import useFetch from "../hooks/useFetch";
import GroupIcon from "@mui/icons-material/Group";
import Card from "../components/CountCard";

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

  const [allJobPosts,allJobPostsError,allJobPostsLoading] = useFetch("/admin/allJobPosts")
  const [verifiedJobPosts,verifiedJobPostsError,verifiedJobPostsLoading] = useFetch("/admin/allJobPosts/verified")
  const [pendingJobPosts,pendingJobPostsError,pendingJobPostsLoading] = useFetch("/admin/allJobPosts/pending")

  const [allApplications,allApplicationsError,allApplicationsLoading] = useFetch("/admin/allApplications")
  

  return (
    <div className="outerDiv">
      <div className="heading">Dashboard</div>
      <div className="grid grid-cols-12 gap-y-4 my-8">
        <div className="col-span-12  grid gap-4 xl:gap-8 2xl:gap-16 grid-cols-12">
          
          <Card icon={<GroupIcon fontSize="large" className="p-1 sm:p-0"/>} title="All Users" count={allUsers&&allUsers.length>=0?allUsers.length:"N.D"} bgColor="bg-indigo-500 " path={"/allUsers"}/>
          <Card icon={<PersonSearchIcon fontSize="large" className="p-1 sm:p-0"/>} title="Job Seekers" count={allJobSeekers&&allJobSeekers.length>=0?allJobSeekers.length:"N.D"} bgColor="bg-violet-500 " path={"/allJobSeekers"}/>
          <Card icon={<PersonIcon fontSize="large" className="p-1 sm:p-0"/>} title="Employers" count={allEmployers&&allEmployers.length>=0?allEmployers.length:"N.D"} bgColor="bg-purple-500 " path={"/allEmployers"}/>
        </div>
        <div className="col-span-12  grid gap-4 xl:gap-8 2xl:gap-16 grid-cols-12">
        <Card icon={<WorkIcon fontSize="large" className="p-1 sm:p-0"/>} title="All Job Posts" count={allJobPosts&&allJobPosts.length>=0?allJobPosts.length:"N.D"} bgColor="bg-teal-500 " path={"/jobPosts"}/>
        <Card icon={<FactCheckIcon fontSize="large" className="p-1 sm:p-0"/>} title="Verified Job Posts" count={verifiedJobPosts&&verifiedJobPosts.length>=0?verifiedJobPosts.length:"N.D"} bgColor="bg-cyan-500 " path={"/jobPosts/verified"}/>
        <Card icon={<WorkHistoryIcon fontSize="large" className="p-1 sm:p-0"/>} title="Pending Job Posts" count={pendingJobPosts&&pendingJobPosts.length>=0?pendingJobPosts.length:"N.D"} bgColor="bg-blue-500 " path={"/jobPosts/pending"}/>
        </div>
        <div className="col-span-12  grid gap-4 xl:gap-8 2xl:gap-16 grid-cols-12">
        <Card icon={<ContactPageIcon fontSize="large" className="p-1 sm:p-0"/>} title="All Job Applications" count={allApplications&&allApplications.length>=0?allApplications.length:"N.D"} bgColor="bg-orange-500 " path={undefined}/>

        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
