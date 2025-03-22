import React from 'react'

const JobPostsTable = ({posts, condition}) => {
  return (
      <table className='grid grid-cols-12 border border-b-0 truncate rounded-md text-xs sm:text-sm md:text-base bg-white'>
          <thead className='col-span-12  border-b bg-brand-dark text-white'>
              <tr className='grid grid-cols-12 '>
                  <th className='col-span-2 sm:col-span-1  text-start p-1'><span className='hidden sm:inline-block'>S.</span>No.</th>
                  <th className='col-span-10 sm:col-span-3  text-start p-1'>Job Title</th>
                  <td className='sm:col-span-3 truncate text-start p-1 hidden sm:block'>Employer</td>
                  {condition === "none" && <th className='col-span-3 hidden sm:block text-start p-1'>Verification</th>}
                  <th className='col-span-2 hidden sm:block text-start p-1'>Action</th>
              </tr>
          </thead>
          <tbody className='col-span-12'>
              {posts && posts.length > 0 && posts.map((post, index) =>

                  <tr className='grid grid-cols-12 border-b' key={index}>
                      <td className='col-span-2 sm:col-span-1  text-start p-1'>{index + 1}</td>
                      <td className='col-span-10 sm:col-span-3 truncate text-start p-1 '>
                          <div>{post.title}</div>
                          <div className='sm:hidden'>{post.employer.name}</div>
                          <div className='sm:hidden'>{post.employer.email}</div>
                          <div className='sm:hidden flex gap-1'>
                              <button className='btn btn-xs text-xxs text-white bg-yellow-500 border-none hover:bg-yellow-500'>Check</button>
                              {condition !== "verified" && <button className='btn btn-xs text-xxs text-white bg-green-500 border-none hover:bg-green-500'>Approve</button>}
                              <button className='btn btn-xs text-xxs text-white bg-red-500 border-none hover:bg-red-500'>Delete</button>
                          </div>

                      </td>
                      <td className='sm:col-span-3 truncate text-start p-1 hidden sm:block'>
                        
                          <div>{post.employer.name}</div>
                        <div>{post.employer.email}</div>
                        </td>
                      {condition === "none" && <td className={`col-span-3 hidden sm:block text-start p-1 ${post.verified===true?"text-green-600":"text-yellow-600"}`}>{post.verified ? "Verified" : "Pending"}</td>}
                      <td className='col-span-2 hidden sm:flex text-start p-1 flex-col gap-1 items-start'>
                        <button className='btn btn-xs text-xxs text-white bg-yellow-500 border-none hover:bg-yellow-500'>Check</button>
                         {condition !== "verified" &&  <button className='btn btn-xs text-xxs text-white bg-green-500 border-none hover:bg-green-500'>Approve</button>}
                          <button className='btn btn-xs text-xxs text-white bg-red-500 border-none hover:bg-red-500'>Delete</button>
                        </td>
                  </tr>

              )}
          </tbody>
      </table>
  )
}

export default JobPostsTable