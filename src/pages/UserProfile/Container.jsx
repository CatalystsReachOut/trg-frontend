import React from 'react'
import { Outlet, useNavigate } from 'react-router'
import Raichand from '../../assets/images/footerlogo.png'
import {MdKeyboardArrowRight} from 'react-icons/md'
import { ROUTES } from '../../routes/RouterConfig'

const Container = () => {
    const navigate = useNavigate()
    return (
        <div className='flex items-center justify-center sm:px-[100px] p-5'>
            <div className='grid grid-cols-7 shadow-lg'>
                <div className="col-span-3 bg-[#0E223D] p-5">
                    <div>
                        <img src={Raichand} className={'w-[150px]'} alt="The Raichand Group" />
                    </div>
                    <div className='text-white mt-[60px] p-10'>
                        <div className='text-2xl'>
                            One of Us ?
                        </div>
                        <button 
                        className='bg-[#19435D] rounded-lg p-2 font-semibold mt-2'
                        onClick={()=>{navigate(ROUTES.User.Login)}}
                        >
                            Sign In
                        </button>

                        <div className='mt-[30px] text-[#F1C40F] text-2xl'>
                            Register with <br />
                            The Raichand Group
                        </div>

                        <div className='mt-5'>
                            <div className='text-lg flex gap-3 items-center mt-3'>
                                <MdKeyboardArrowRight className='text-[#F1C40F]'/>
                                Stay Updated with new openings
                            </div>
                            <div className='text-lg flex gap-3 items-center mt-3'>
                                <MdKeyboardArrowRight className='text-[#F1C40F]'/>
                                Recruiters contact eligible Profiles
                            </div>
                            <div className='text-lg flex gap-3 items-center mt-3'>
                                <MdKeyboardArrowRight className='text-[#F1C40F]'/>
                                Single portal for all business  
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-span-4">
                    <Outlet />
                </div>

            </div>
        </div>
    )
}

export default Container