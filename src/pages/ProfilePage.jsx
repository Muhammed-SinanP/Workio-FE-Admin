import React, { useState } from 'react'
import useFetch from '../hooks/useFetch';
import { useNavigate } from "react-router-dom";
import Avatar from "react-avatar"
import PersonIcon from '@mui/icons-material/Person';
import ProfileForm from '../components/forms/ProfileForm';
import { useConfirm } from "material-ui-confirm";
import LogoutIcon from '@mui/icons-material/Logout';
import { axiosInstance } from '../config/axiosInstance';
import toast from 'react-hot-toast';
import ProfilePageSkeleton from '../components/loading/ProfilePageSkeleton';
import ErrorDiv from '../components/ErrorDiv';

const ProfilePage = () => {
  const confirm = useConfirm()
  const navigate = useNavigate()
  const [refreshProfile, setRefreshProfile] = useState(false);
  const [userProfile, userProfileError, userProfileLoading] = useFetch("/user/myProfile", [
    refreshProfile,
  ]);
  function refreshPage() {
    setRefreshProfile(!refreshProfile)
  }


  function handleLogout() {
    async function userLogout() {
      try {
        const response = await axiosInstance({
          method: "POST",
          url: "/user/logout",
        });
        if (response.status === 200) {
          toast.success("Logged out successfully")
          navigate("/");
        }
      } catch (err) {
        toast.error("Logout failed")
      }
    }

    confirm({
      title: "Logout Confirmation",
      description: "Are you sure you want to do logout?",
      confirmationText: "Confirm",
      cancellationText: "Cancel",
    })
      .then(() => {
        userLogout();
      })
  }

  return (
    <div className="">
      <div className="heading">Admin Profile</div>

      {userProfileError ?
        <ErrorDiv info={"Error fetching user profile."} />
        :
        <div className="main-div">
          {userProfile ?
            <div className="flex flex-col gap-4 pb-32">
              <div className="flex justify-between gap-2 rounded-md bg-brand-light p-4 sm:p-6 shadow-sm dark:bg-dark-input">
                <div className="flex flex-col gap-2 pb-2">
                  <div className="text-lg font-bold text-brand-dark lg:text-3xl dark:text-brand">
                    {userProfile?.profile?.name}
                  </div>
                  <div className="tracking-wide text-sm text-brand-extralight dark:text-dark-text">
                    Manage your admin profile
                  </div>
                </div>

                <Avatar
                  name={userProfile?.profile?.name}
                  textSizeRatio={1.5}
                  className="rounded-full"
                  color="#360269"
                  size="60px"
                />
              </div>
              <div className="rounded-md bg-white p-4 shadow-sm dark:bg-dark-input border-0.5 dark:text-dark-text">
                <div className="relative rounded-md border p-2 pl-3  sm:p-4 ">
                  <div className="flex flex-col gap-1">
                    <div className="mt-1.5 flex items-center gap-1">
                      <PersonIcon className="dark:text-dark-text" />

                      <div className="-mb-0.5 flex text-lg font-medium">
                        Personal info
                      </div>
                    </div>
                  </div>

                  <div className="mt-4">
                    {userProfile && <ProfileForm userProfile={userProfile} refreshPage={refreshPage} />}
                  </div>
                </div>
              </div>

              <div>
                <button
                  onClick={handleLogout}
                  className="btn btn-sm flex gap-0.5 border-none bg-slate-300 tracking-wide text-brand-text hover:bg-slate-400 dark:bg-slate-400 dark:hover:bg-slate-300"
                >
                  <LogoutIcon fontSize='small' />
                  Logout
                </button>
              </div>
            </div>

            :

            <ProfilePageSkeleton />

          }
        </div>
      }

    </div>
  )
}

export default ProfilePage