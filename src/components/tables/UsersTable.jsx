import { useConfirm } from 'material-ui-confirm';
import React, { useEffect } from 'react'
import { axiosInstance } from '../../config/axiosInstance';
import toast from 'react-hot-toast'
import { formatDatetoString } from '../../utils/date';

const UsersTable = ({ users, userRole, refreshPage, isLoading, skipSNo }) => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const confirm = useConfirm();
    function handleDelete(userId, userEmail) {
        toast.dismiss()
        async function deleteUser() {
            const loading = toast.loading("Deleting user")
            try {
                const response = await axiosInstance({
                    method: "DELETE",
                    url: `/admin/users/${userId}`
                })
                if (response.status === 200) {
                    toast.dismiss(loading)
                    toast.success("User deleted successfully")
                    refreshPage()
                }
                else {
                    toast.dismiss(loading)
                    toast.error("User deletion failed")
                }
            } catch (err) {
                toast.dismiss(loading)
                toast.error("User deletion failed")
            }
        }

        confirm({
            title: "Confirm delete user",
            description: `Deleting user '${userEmail}', this can't be undone`,
            confirmationText: "Confirm"
        })
            .then(() => {
                deleteUser()
            })
    }

    return (
        <table className={`${isLoading ? "opacity-50" : "opacity-100"} grid grid-cols-12 border border-b-0 truncate rounded-md text-xs sm:text-sm  bg-white dark:bg-dark-text`}>
            <thead className='col-span-12  border-b bg-brand-dark text-white'>
                <tr className='grid grid-cols-12 '>
                    <th className='col-span-2 sm:col-span-1  text-start p-1'><span className='hidden sm:inline-block'>S.</span>No.</th>
                    <th className='col-span-10 sm:col-span-6  text-start p-1'>User</th>
                    {userRole === "all" && <th className='col-span-3 hidden sm:block text-start p-1'>Role</th>}
                    <th className='col-span-2 hidden sm:block text-start p-1'>Action</th>
                </tr>
            </thead>
            <tbody className='col-span-12 text-xs'>
                {users && users.length > 0 ? users.map((user, index) =>

                    <tr className='grid grid-cols-12 border-b' key={index}>
                        <td className='col-span-2 sm:col-span-1  text-start p-1'>{index + skipSNo + 1}</td>
                        <td className='col-span-10 sm:col-span-6 truncate text-start p-1 '>
                            <p>{user.name}</p>
                            <p>{user.email}</p>
                            {userRole === "all" && <p className='sm:hidden'>{user.role === "employer" ? "Employer" : "Job Seeker"}</p>}
                            <p className=' text-xxs'>[{formatDatetoString(user.createdAt)}]</p>
                            <div className='sm:hidden'><button onClick={() => handleDelete(user._id, user.email)} className='btn btn-xs text-xxs text-white bg-red-500 border-none hover:bg-red-500'>Remove</button></div>

                        </td>
                        {userRole === "all" && <td className='col-span-3 hidden sm:block text-start p-1'>{user.role === "employer" ? "Employer" : "Job Seeker"}</td>}
                        <td className='col-span-2 hidden sm:block text-start p-1'><button onClick={() => handleDelete(user._id, user.email)} className='btn btn-xs text-xxs text-white bg-red-500 border-none hover:bg-red-500'>Remove</button></td>
                    </tr>

                )
                    :
                    <tr className='grid grid-cols-12 border-b'>
                        <td className='col-span-12 text-center p-1'> No data available.</td>
                    </tr>



                }
            </tbody>
        </table>
    )
}

export default UsersTable