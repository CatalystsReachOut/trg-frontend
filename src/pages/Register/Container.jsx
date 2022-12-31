import React from 'react'
import { Outlet } from 'react-router-dom'

import { UserOutlined } from '@ant-design/icons';
import Raichand  from '../../assets/images/footerlogo.png' 

import './fieldstyles.css'


const Container = () => {
    return (
        <>
       
        <div className='flex justify-center items-center min-h-screen'>
            <div className='flex justify-center rounded-lg'>
                <div className=' -z-[1] bg-[#0E223D] min-h-[90vh] w-[400px] rounded-lg translate-x-[100px]'>
                    <img src={Raichand} alt="Company logo" className='w-[8rem] mt-[2.5rem] ml-[2.5rem]'/>
                </div>
                <div className="h-[80%] my-auto left-[200px] z-10 flex flex-col w-[550px] max-w-md px-4 py-8 bg-white rounded-lg shadow-2xl shadow-gray-600/50  sm:px-6 md:px-8 lg:px-10 min-h-[80vh] -translate-x-[100px] justify-center">
                    <Outlet />
                </div>
            </div>
        </div>
        </>

    )
}

export default Container