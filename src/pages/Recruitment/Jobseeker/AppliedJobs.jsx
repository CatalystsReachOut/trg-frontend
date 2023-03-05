import React from 'react'
import BackButton from '../../../components/Button/BackButton'
import Input from '../../../components/Input/Input'
import JobCard from './JobCard'
import * as apiProvider from '../../../services/api/recruitment'
import * as apiProviderJobSeeker from '../../../services/api/jobseeker'
import { useEffect } from 'react'
import { useState } from 'react'
import { USER_ID } from '../../../utils/storageConstants'

const AppliedJobs = () => {

    const [jobs, setJobs] = useState([])

    const [appliedJobs, setAppliedJobs] = useState([])

    const getJobs = () => {
        apiProvider.getJob()
        .then(res => {
            console.log(res)
            setJobs(res.data)
        })
        .catch(err => {
            console.log(err)
        })
    }

    const getApplications = () => {
        apiProviderJobSeeker.getJobApplications()
        .then(res=>{
            setAppliedJobs(res.data)
            console.log('applied',res);
        })
        .catch(err=>{
            console.log(err);
        })
    }


    useEffect(()=>{
        getJobs()
        getApplications()
    },[])

  return (
    <div>
        <div>
            <div className='flex justify-between'>
                <div>
                    <BackButton/>
                </div>
                <div>
                    <Input
                    label={""}
                    className="gap-0 w-[350px]"
                    placeHolder="Search Jobs"
                    />
                </div>
            </div>
        </div>
        <div className="mt-3">
            <div className="grid lg:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-6">
                {
                    appliedJobs?.map((i, key) => {
                        return (
                            <div key={key} className="col-span-1">
                                <JobCard job={jobs.find(s=>s._id==i.jobId)} appication={i}/>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    </div>
  )
}

export default AppliedJobs