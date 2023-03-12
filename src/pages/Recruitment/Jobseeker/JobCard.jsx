import React from 'react'
import { useNavigate } from 'react-router-dom'
import { ROUTES } from '../../../routes/RouterConfig'

const JobCard = ({ job, applied }) => {

    const navigate = useNavigate()
    return (
        <div className='w-full p-4 bg-[white] rounded-[10px]'>
            <div className="flex justify-between items-center">
                <img className='w-[100px]' src="https://raichandgroup.com/assets/images/logo/sidebar-logo.png" alt="" />
                {job?.businessName}
            </div>
            <h3 className='text-xl mt-5 font-bold'>
                {job?.profileName}
            </h3>
            <p className='text-base mt-3'>
                This is a little description about this job role This is Static
            </p>
            <p className='text-sm mt-3'>2 Weeks ago</p>
            <div className='flex gap-2 items-center mt-3'>
                <div className='bg-primary text-black p-1 text-sm rounded-full px-2'>
                    Remote
                </div>
            </div>
            <div className='flex justify-end'>
                {
                    !applied ?

                        <button onClick={() => { navigate(ROUTES.JobSeeker.Job + '/' + job._id) }} className=" bg-primary text-light mt-5 p-2 px-4 rounded-lg">
                            View
                        </button>
                        :
                        <button onClick={() => { navigate(ROUTES.JobSeeker.Job + '/' + job._id) }} className=" bg-secondary text-light mt-5 p-2 px-4 rounded-lg">
                            Applied
                        </button>
                }



            </div>
        </div>
    )
}

export default JobCard