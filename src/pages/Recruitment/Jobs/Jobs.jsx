import React, { useState, useEffect } from 'react'
import * as apiProvider from '../../../services/api/recruitment'
import JobComponent from "../../../components/Jobs/Jobs"
import { RiSearch2Line } from 'react-icons/ri'
import Select from 'react-select'
import Card from '../../../components/Card/Card'

const Jobs = () => {

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


  useEffect(() => {
    getData();
  }, [])




  return (
  <div>
    <Card className='h-[50px] flex items-center justify-between px-3 '>
      <div className='flex items-center gap-3'>
        <Select/>
        <Select/>
        <Select/>
        <Select
        options={[{
          label:'label1',
          value:'value1',
          isOptionSelected:true
        }]}
        />
      </div>
      <div className='flex items-center gap-3'>
        <div className='flex p-2 gap-2 items-center bg-white10 h-[40px] rounded-lg'>
          <RiSearch2Line/>
          <input type="text" placeholder='Search' className='outline-none focus:outline-none p-2 w-auto bg-transparent'/>
        </div>
        <button className='bg-secondary h-[40px] p-2 rounded-lg'>
           + Add Job
        </button>
      </div>
    </Card>
    <Card className='mt-3'>
    {
      data && data?.length !=0 ? data.map((item, key) => {

        return <JobComponent data={item} />
      })
    :
    <div>
      No Jobs Avaialable
    </div>
    }
      </Card>

  </div>
  )
}

export default Jobs