import React from 'react'
import ErrorDiv from '../components/ErrorDiv'

const ErrorPage = () => {
  return (
    <div className='min-h-screen bg-brand-extralight'><ErrorDiv info={"No such page exists."}/></div>
  )
}

export default ErrorPage