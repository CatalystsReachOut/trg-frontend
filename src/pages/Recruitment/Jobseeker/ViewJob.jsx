import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { FiBriefcase, FiDollarSign, FiMapPin, FiPaperclip } from 'react-icons/fi'
import { useParams } from 'react-router-dom'
import BackButton from '../../../components/Button/BackButton'
import * as apiProvider from './../../../services/api/recruitment'
import * as apiProviderSeeker from './../../../services/api/jobseeker'
import * as storageConstants from './../../../utils/storageConstants'

const ViewJob = () => {

  const [job, setJob] = useState()

  const getUserId = () => {
    return localStorage.getItem(storageConstants.USER_ID)?localStorage.getItem(storageConstants.USER_ID):null
  }

  const [userId, setUserId] = useState(getUserId())

  const {id} = useParams()

  console.log(userId);

  const getJobsDetials = async() => {
    await apiProvider.getJobById(id)
    .then(res=>{
      console.log(res);
      setJob(res.data)
    })
    .catch(err=>{
      console.log(err);
    })
  }

  const handleSubmit = () => {
    apiProviderSeeker.ApplyJob(id)
    .then(res=>{
      console.log(res);
    })
    .catch(err=>{
      console.log(err);
    })
  }


  useEffect(()=>{
    if(id){
      getJobsDetials();
    }
  },[id])
  return (
    <div className=''>
      <div className="w-full bg-blue h-[50vh]  p-5">
        <BackButton />
        <div className=' flex justify-center'>
          <div className='sm:w-[60%] w-[100%] flex flex-col align-center'>
            <h2 className='text-2xl text-[white]  '>
              {job?.businessName}
            </h2>
            <h3 className='text-2xl text-secondary '>
              Join Us
            </h3>
            <h6 className='mt-6 text-xsm text-[white] '>
              {job?.profileName}

            </h6>
          </div>

        </div>

      </div>
      <div>
        <div className='flex justify-center'>
          <div className='sm:w-[60%] w-[100%] bg-[white] min-h-[200px] p-4 relative -translate-y-[80px]'>
            <h4 className='text-2xl font-bold text-center'>{job?.profileName}</h4>
            <div className="mt-4 sm:px-[50px] px-5">
              <div className='flex flex-col gap-[20px]'>
                <div className="flex gap-[20px] items-center font-semibold">
                  <FiBriefcase />
                  Part-Time
                </div>
                <div className="flex gap-[20px] items-center font-semibold">
                  <FiPaperclip />
                  none
                </div>
                <div className="flex gap-[20px] items-center font-semibold">
                  <FiMapPin />
                  {job?.cityName}
                </div>
                <div className="flex gap-[20px] items-center font-semibold">
                  <FiDollarSign />
                  {job?.job?.payRange?.from} to {job?.job?.payRange?.to} INR Per Annum
                </div>
              </div>
              <div className="mt-6 flex flex-col gap-[30px]">
                <div>
                  <h4 className="text-lg font-bold">
                    Eligibility
                  </h4>
                  <ol>
                    <li>
                      Any Undergraduate Degree with reloevent knowledge of development
                    </li>
                    <li>
                      Knowledge of MERN Stack Development
                    </li>
                  </ol>
                </div>
                <div>
                  <h4 className="text-lg font-bold">
                    Description
                  </h4>
                  <div>
                    This is Job description required to understand the job cleanly
                  </div>
                </div>
              </div>
              <div className='flex justify-end'>
                <button onClick={handleSubmit} className="bg-primary text-[black] p-2 px-4 btn-primary rounded-lg">
                  Apply Now
                </button>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}

export default ViewJob