import React from 'react'

import BackButton from '../../../components/Button/BackButton'
import Select from './../../../components/Select/Select'
import Input from '../../../components/Input/Input'
import Button from '../../../components/Button/Button'
import Card from './../../../components/Card/Card'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import * as apiProvider from '../../../services/api/recruitment'
import { useEffect } from 'react'


const Create = ({ notify, enterLoading, exitLoading, loadings }) => {

  const navigate = useNavigate()

  const [profileOpt, setProfileOpt] = useState([])
  const [bussinessOpt, setBussinessOpt] = useState([])
  const [countryOpt, setCountryOpt] = useState([])
  const [stateOpt, setStateOpt] = useState([])
  const [cityOpt, setCityOpt] = useState([])

  const [user, setUser] = useState({
    profileId: '',
    businessId: '',
    stateId: '',
    cityId: '',
    countryId: '',
    numberOfOpenings: ''
  })

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handelChangeSelect = (e) => {
    const { name, value } = e;
    setUser(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = () => {
    enterLoading(1)

    apiProvider.createJob(user)
      .then(res => {
        exitLoading(1)
        if (res.isSuccess) {
          navigate(`/job/progress/${res.data?._id}`)
          return notify('success', 'job created successfully');
        } else {
          throw res.message;
        }
      })
      .catch(err => {
        exitLoading(1)
        console.log(err)
        return notify('error', 'some error occured');

      })
  }


  const getBasicData = async () => {
    const [data1, data2, data3, data4, data5] = await Promise.all([
      apiProvider.getProfile()
        .then(res => {
          const arr = res.data?.map(i => ({
            label: i?.title,
            value: i?._id
          }))
          return arr;
        })
        .catch(err => (console.log(err)))
      ,
      apiProvider.getBusiness()
        .then(res => {
          const arr = res.data?.map(i => ({
            label: i?.name,
            value: i?._id
          }))
          return arr;
        })
        .catch(err => (console.log(err)))
      ,
      apiProvider.getCountry()
        .then(res => {
          const arr = res.data?.map(i => ({
            label: i?.name,
            value: i?._id
          }))
          return arr;
        })
        .catch(err => { console.log(err); return null })
      ,
      apiProvider.getState()
        .then(res => {
          const arr = res.data?.map(i => ({
            label: i?.name,
            value: i?._id
          }))
          return arr;
        })
        .catch(err => (console.log(err)))
      ,
      apiProvider.getCity()
        .then(res => {
          const arr = res.data?.map(i => ({
            label: i?.name,
            value: i?._id
          }))
          return arr;
        })
        .catch(err => (console.log(err)))
    ])

    setProfileOpt(data1);
    setBussinessOpt(data2)
    setCountryOpt(data3)
    setStateOpt(data4)
    setCityOpt(data5)
  }

  useEffect(() => {
    getBasicData()
  }, [])



  return (
    <div className='flex w-full relative min-h-[80vh]'>
      <div className=' h-auto w-full flex'>
        <Card className='min-h-full h-full w-full relative px-6 flex flex-col'>
          <BackButton onClick={() => navigate(-1)} />
          <div className=''>
            <h3 className='text-Medium+/Title/Small mt-2'> Create New Job</h3>
            <hr className='my-3 h-3' />
            <div className='grid grid-cols-12 gap-4'>
              <div className="lg:col-span-4 sm:col-span-6 col-span-12">
                <Select
                  label="Profile"
                  name='profileId'
                  options={profileOpt}
                  onChange={handelChangeSelect}
                />
              </div>
              <div className="lg:col-span-4 sm:col-span-6 col-span-12">
                <Select
                  label="Business"
                  name="businessId"
                  options={bussinessOpt}
                  onChange={handelChangeSelect}
                />
              </div>
              <div className="lg:col-span-4 sm:col-span-6 col-span-12">
                <Input
                  label="Number of Openings"
                  name="numberOfOpenings"
                  value={user?.numberOfOpenings}
                  onChange={handleChange}
                />
              </div>
              <div className="lg:col-span-4 sm:col-span-6 col-span-12">
                <Select
                  label="Country"
                  name="countryId"
                  options={countryOpt}
                  onChange={handelChangeSelect}
                />
              </div>
              <div className="lg:col-span-4 sm:col-span-6 col-span-12">
                <Select
                  label="State"
                  name="stateId"
                  options={stateOpt}
                  onChange={handelChangeSelect}
                />
              </div>
              <div className="lg:col-span-4 sm:col-span-6 col-span-12">
                <Select
                  label="City"
                  name="cityId"
                  options={cityOpt}
                  onChange={handelChangeSelect}
                />
              </div>
            </div>
          </div>
          <div className='mt-auto flex gap-3 py-3'>
            <Button loading={loadings[1]} title="Submit" onClick={() => handleSubmit()} className=' ' />
            <Button type='2' title="Cancel" className='' />
          </div>

        </Card>

      </div>
    </div>
  )
}

export default Create