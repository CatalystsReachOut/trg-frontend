import React from 'react'
import { Outlet } from 'react-router-dom'

import { UserOutlined } from '@ant-design/icons';
import { Avatar } from 'antd';

import './fieldstyles.css'


const Container = () => {
    return (
        <>
       
        <div className='flex items-center justify-center min-h-screen'>
            <div className='absolute right-[60%] bg-[#0E223D] h-[90vh] w-[30vw] rounded-lg'>

            <Avatar size={56} className=" ml-[10%] mt-[10%] " icon={<UserOutlined />} />
            </div>
            <div className="relative  z-10 flex flex-col w-[50vw] max-w-md px-4 py-8 bg-white rounded-lg shadow-2xl shadow-gray-600/50 dark:bg-gray-800 sm:px-6 md:px-8 lg:px-10 min-h-[80vh]">

               <Outlet />

            </div>
        </div>
        </>

    )
}

export default Container