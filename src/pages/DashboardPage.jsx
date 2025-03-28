import React from "react";
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

  const [allUsers, allUsersError, allUsersLoading] = useFetch("/admin/users/all");
  const [jobSeekers, jobSeekersError, jobSeekersLoading] = useFetch("/admin/users/job_seeker");
  const [employers, employersError, employersLoading] = useFetch("/admin/users/employer");

  const [allJobPosts, allJobPostsError, allJobPostsLoading] = useFetch("/admin/jobPosts/all")
  const [verifiedJobPosts, verifiedJobPostsError, verifiedJobPostsLoading] = useFetch("/admin/jobPosts/verified")
  const [pendingJobPosts, pendingJobPostsError, pendingJobPostsLoading] = useFetch("/admin/jobPosts/pending")

  const [allApplications, allApplicationsError, allApplicationsLoading] = useFetch("/admin/allApplications")



  return (
    <div className="">
      <div className="heading">Dashboard</div>
      <div className="main-div count-container">
        <div className="count-row">
          <CountCard icon={<GroupIcon />} title="Total Users" count={!allUsersError ? allUsersLoading ? null : allUsers.usersCount : "N.D"} bgColor="bg-brand" path={"/users"} />
          <CountCard icon={<PersonSearchIcon />} title="Job Seekers" count={!jobSeekersError ? jobSeekersLoading ? null : jobSeekers.usersCount : "N.D"} bgColor="bg-teal-600" path={"/users/jobSeekers"} />
          <CountCard icon={<PersonIcon />} title="Employers" count={!employersError ? employersLoading ? null : employers.usersCount : "N.D"} bgColor="bg-blue-600" path={"/users/employers"} />
        </div>
        <div className="count-row">
          <CountCard icon={<WorkIcon />} title="Total Job Posts" count={!allJobPostsError ? allJobPostsLoading ? null : allJobPosts.jobPostsCount : "N.D"} bgColor="bg-teal-500" path={"/jobPosts"} />
          <CountCard icon={<FactCheckIcon />} title="Verified Job Posts" count={!verifiedJobPostsError ? verifiedJobPostsLoading ? null : verifiedJobPosts.jobPostsCount : "N.D"} bgColor="bg-green-600 " path={"/jobPosts/verified"} />
          <CountCard icon={<WorkHistoryIcon />} title="Pending Job Posts" count={!pendingJobPostsError ? pendingJobPostsLoading ? null : pendingJobPosts.jobPostsCount : "N.D"} bgColor="bg-yellow-500 " path={"/jobPosts/pending"} />
        </div>
        <div className="count-row">
          <CountCard icon={<ContactPageIcon />} title="Total Job Applications" count={!allApplicationsError?allApplicationsLoading?null:allApplications.length:"N.D"} bgColor="bg-blue-500" path={undefined} />
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
