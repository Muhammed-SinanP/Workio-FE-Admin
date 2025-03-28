import React from 'react'

const ProfilePageSkeleton = () => {
  return (
    <div className='flex flex-col gap-4'>
      <div className='skeleton rounded-md h-32'></div>
      <div className='skeleton rounded-md h-64'></div>
      <div className='skeleton rounded-md h-7 w-24'></div>
    </div>
  )
}

export default ProfilePageSkeleton