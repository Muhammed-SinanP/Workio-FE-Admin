import React from 'react'

const Footer = () => {
  return (
    <div className='bg-brand-dark dark:bg-dark text-white dark:text-dark-text p-4'>
      <div className='font-brand-font text-center'>W</div>
      <div className='flex justify-center gap-6 mt-5'>
        <a href={import.meta.env.VITE_JOBSEEKER_FRONTEND_URL} target='_blank' rel="noopener noreferrer" className='text-sm underline hover:text-white'>Workio for job seeker</a>
        <a href={import.meta.env.VITE_EMPLOYER_FRONTEND_URL} target='_blank' rel="noopener noreferrer" className='text-sm underline hover:text-white'>Workio for employer</a>
      </div>
      <p className='text-center mt-8 text-xs'>Workio, Inc. © All Rights Reserved Worldwide</p>
    </div>
  )
}

export default Footer