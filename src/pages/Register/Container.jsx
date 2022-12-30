import React from 'react'
import { Outlet } from 'react-router-dom'

import { UserOutlined } from '@ant-design/icons';
import Raichand  from '../../assets/images/footerlogo.png' 

import './fieldstyles.css'


const Container = () => {
    return (
        <>
       
        <div className='relative flex ml-[50%] items-center min-h-screen'>
            <div className='absolute  -z-[1] ml-[-16rem]  bg-[#0E223D] h-[90vh] w-[400px] rounded-lg'>

            <img src={Raichand} alt="Company logo" className='w-[10rem] mt-[2.5rem] ml-[2.5rem]'/>
            </div>
            <div className="relative  z-10 flex flex-col w-[50vw] max-w-md px-4 py-8 bg-white rounded-lg shadow-2xl shadow-gray-600/50 dark:bg-gray-800 sm:px-6 md:px-8 lg:px-10 min-h-[80vh]">

               <Outlet />

            </div>
        </div>
        </>

    )
}

export default Container