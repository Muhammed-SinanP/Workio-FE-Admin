import React from 'react'
import Logo from './Logo'
import DarkModeBtn from '../components/buttons/DarkModeBtn';

const AuthHeader = () => {
  return (
    <div className='bg-brand w-full flex justify-between items-center p-2'>
        <div><Logo expandSidebar={true}/></div>
        <div className='text-white'><DarkModeBtn expandSidebar={false}/></div>
    </div>
  )
}

export default AuthHeader