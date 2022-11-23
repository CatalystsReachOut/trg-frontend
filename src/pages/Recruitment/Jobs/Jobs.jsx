import React, { useState, useEffect } from 'react'
import * as apiProvider from '../../../services/api/recruitment'
import JobComponent from "../../../components/Jobs/Jobs"
import { RiSearch2Line } from 'react-icons/ri'
import Select from 'react-select'
import Card from '../../../components/Card/Card'
import * as storageConstant from './../../../utils/storageConstants'
import { useNavigate } from 'react-router-dom'
import { ROUTES } from '../../../routes/RouterConfig'

const Jobs = () => {

  const navigate = useNavigate()

  const [data, setData] = useState()

  const getData = () => {
    apiProvider.getJob()
      .then(res => {
        if (res.isSuccess) {
          setData(res.data)
        }
      })
      .catch(err => {
        console.log(err)
      })
  }

  const level = localStorage.getItem(storageConstant.LEVEL)


  useEffect(() => {
    getData();
  }, [])




  return (
    <div>
      <Card className=' flex items-center justify-between px-3 flex-wrap gap-3'>
        <div className='flex items-center gap-3 flex-wrap'>
          <Select />
          <Select />
          <Select />
          <Select
            options={[{
              label: 'label1',
              value: 'value1',
              isOptionSelected: true
            }]}
          />
        </div>
        <div className='flex items-center gap-3'>
          <div className='flex p-2 gap-2 items-center bg-white10 h-[40px] rounded-lg'>
            <RiSearch2Line />
            <input type="text" placeholder='Search' className='outline-none focus:outline-none p-2 w-auto bg-transparent' />
          </div>
          <button onClick={() => { navigate(ROUTES.Recruitment.CreateJob) }} className='btn-primary text-white h-[40px] p-2 rounded-lg'>
            + Add Job
          </button>
        </div>

      </Card>
      {
        data && data?.length != 0 ? data.map((item, key) => {
          // return <JobComponent data={item} />
          if (item?.approver_1?.status == 'PENDING' && level >= 5)
            return <JobComponent data={item} />
          else if (item?.approver_2?.status == 'PENDING' && level >= 4)
            return <JobComponent data={item} />
          else if (item?.approver_3?.status == 'PENDING' && level >= 3)
            return <JobComponent data={item} />
          else if (item?.approver_4?.status == 'PENDING' && level >= 2)
            return <JobComponent data={item} />
          else
            return <JobComponent data={item} />
        })
          :
          <div>
            No Jobs Avaialable
          </div>
      }


    </div>
  )
}

export default Jobs