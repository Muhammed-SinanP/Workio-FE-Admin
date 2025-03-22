import React from 'react'

const UsersTable = ({ users,userRole }) => {
    return (
        <table className='grid grid-cols-12 border border-b-0 truncate rounded-md text-xs sm:text-sm md:text-base bg-white'>
            <thead className='col-span-12  border-b bg-brand-dark text-white'>
                <tr className='grid grid-cols-12 '>
                    <th className='col-span-2 sm:col-span-1  text-start p-1'><span className='hidden sm:inline-block'>S.</span>No.</th>
                    <th className='col-span-10 sm:col-span-6  text-start p-1'>User</th>
                  { userRole === "all" && <th className='col-span-3 hidden sm:block text-start p-1'>Role</th>}
                    <th className='col-span-2 hidden sm:block text-start p-1'>Action</th>
                </tr>
            </thead>
            <tbody className='col-span-12'>
                {users && users.length > 0 && users.map((user, index) =>

                    <tr className='grid grid-cols-12 border-b' key={index}>
                        <td className='col-span-2 sm:col-span-1  text-start p-1'>{index + 1}</td>
                        <td className='col-span-10 sm:col-span-6 truncate text-start p-1 '>
                            <div>{user.name}</div>
                            <div>{user.email}</div>
                            <div className='sm:hidden'><span className='btn btn-xs text-xxs text-white bg-red-500 border-none hover:bg-red-500'>Remove</span></div>

                        </td>
                        {userRole === "all" &&  <td className='col-span-3 hidden sm:block text-start p-1'>{user.role === "employer" ? "Employer" : "Job Seeker"}</td>}
                        <td className='col-span-2 hidden sm:block text-start p-1'><span className='btn btn-xs text-xxs text-white bg-red-500 border-none hover:bg-red-500'>Remove</span></td>
                    </tr>

                )}
            </tbody>
        </table>
    )
}

export default UsersTable