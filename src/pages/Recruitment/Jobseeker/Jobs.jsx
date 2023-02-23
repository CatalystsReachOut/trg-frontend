import React from 'react'
import BackButton from '../../../components/Button/BackButton'
import Input from '../../../components/Input/Input'
import JobCard from './JobCard'
import * as apiProvider from '../../../services/api/recruitment'
import { useEffect } from 'react'
import { useState } from 'react'

const Jobs = () => {

    const [jobs, setJobs] = useState([])

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


    useEffect(()=>{
        getJobs()
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
                    jobs.map((i, key) => {
                        return (
                            <div key={key} className="col-span-1">
                                <JobCard job={i}/>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    </div>
  )
}

export default Jobs