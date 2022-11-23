import React from 'react'

import BackButton from '../../../components/Button/BackButton'
import Select from './../../../components/Select/Select'
import Input from '../../../components/Input/Input'
import Button from '../../../components/Button/Button'
import Card from './../../../components/Card/Card'
import { useState } from 'react'
import Swal from 'sweetalert2'
import { useNavigate, useParams } from 'react-router-dom'
import * as apiProvider from '../../../services/api/recruitment'
import { useEffect } from 'react'

const Apprver1 = () => {

  const navigate = useNavigate()

  const { id } = useParams()
  
  const [user, setUser] = useState({
    profile:'',
    bussiness:'',
    openings:'',
    country:'',
    state:'',
    city:'',
    approver1:{
      status:'APPROVED'
    }
  })

  const handleConfirmation = async() => {
    await Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#2ecc71',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Approve'
      }).then(async(result) => {
        if (result.isConfirmed) {
          Swal.fire(
            'Approved',
            'Job has been Approved.',
            'success'
          )
          // navigate('/s2')
          // apiProvider.updateJobById({user})
        }
      })
  }

  const handleChange = (e) => {
    const {name, value} = e.target;
    setUser(prev=>({
      ...prev,
      [name]:value
    }))
  }

  const handelChangeSelect = (e) => {
    const {name, value} = e;
    setUser(prev=>({
      ...prev,
      [name]:value
    }))
  }

  const getData = () => {
    apiProvider.getJobById(id)
    .then(res=>{
      console.log(res.data.job);
      setUser({
        profile:res.data.job.profileId,
        bussiness:res.data.job.businessId,
        openings:res.data.job.numberOfOpenings,
        country:res.data.job.countryId,
        state:res.data.job.stateId,
        city:res.data.job.cityId,
      })
    })
    .catch(err=>{
      console.log(err);
    })
  }

  const getAllData = () => {
  
  }

  

  const handleSubmit =()=>{
    apiProvider.updateJobById({user})
    .then(res=>{
      console.log(res)
    })
    .catch(err=>{
      console.log(err)
    })
  }

  useEffect(()=>{
    getData()
  },[])

  return (
    <div className='flex w-full relative min-h-[80vh]'>
    <div className=' h-auto w-full flex'>
      <Card className='min-h-full h-full w-full relative px-6 flex flex-col'>
        <BackButton onClick={()=>{navigate(-1)}}/>
        <div className=''>
          <h3 className='text-Medium+/Title/Small mt-2'>Approve Job</h3>
          <hr className='my-3 h-3' />
          <div className='grid grid-cols-12 gap-4'>
            <div className="lg:col-span-4 sm:col-span-6 col-span-12">
              <Select
                label="Profile"
                name='profile'
                onChange={handelChangeSelect}
              />
            </div>
            <div className="lg:col-span-4 sm:col-span-6 col-span-12">
              <Select
                label="Bussiness"
                name="bussiness"
                onChange={handelChangeSelect}
                defaultValue={user?.bussiness}
              />
            </div>
            <div className="lg:col-span-4 sm:col-span-6 col-span-12">
              <Input
                label="Number of Openings"
                name="openings"
                value={user?.openings}
                onChange={handleChange}
                placeholder="Please enter the details"
              />
            </div>
            <div className="lg:col-span-4 sm:col-span-6 col-span-12">
              <Select
                label="Country"
                name="country"
                onChange={handelChangeSelect}
              />
            </div>
            <div className="lg:col-span-4 sm:col-span-6 col-span-12">
              <Select
                label="State"
                name="state"
                onChange={handelChangeSelect}
              />
            </div>
            <div className="lg:col-span-4 sm:col-span-6 col-span-12">
              <Select
                label="City"
                name="city"
                onChange={handelChangeSelect}
              />
            </div>
          </div>
        </div>
        <div className='mt-auto flex gap-3 py-3'>
          <Button 
          title="Approve" 
          className=' ' 
          onClick={()=>{handleSubmit();}}/>
          <Button type='2' title="Reject" className='' />
        </div>
        
      </Card>

    </div>
    </div>
  )
}

export default Apprver1