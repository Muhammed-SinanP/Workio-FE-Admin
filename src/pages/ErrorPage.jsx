import React, { useEffect } from 'react'
import ErrorDiv from '../components/ErrorDiv'

const ErrorPage = () => {
   useEffect(() => {
      window.scrollTo(0, 0);
    }, []);
  return (
    <div className='min-h-screen bg-brand-extralight'><ErrorDiv info={"No such page exists."}/></div>
  )
}

export default ErrorPage