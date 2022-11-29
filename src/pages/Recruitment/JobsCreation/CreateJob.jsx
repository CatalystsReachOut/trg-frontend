import React from 'react'

import BackButton from '../../../components/Button/BackButton'
import Select from './../../../components/Select/Select'
import Input from '../../../components/Input/Input'
import Button from '../../../components/Button/Button'
import Card from './../../../components/Card/Card'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import * as apiProvider from '../../../services/api/recruitment'
import * as storageConstant from '../../../utils/storageConstants'

import { useEffect } from 'react'

import { Modal } from 'antd'


const Create = ({ notify, enterLoading, exitLoading, loadings }) => {





  const navigate = useNavigate()

  const [profileOpt, setProfileOpt] = useState([])
  const [businessOpt, setBusinessOpt] = useState([])
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

  const [createdJob, setCreatedJob] = useState()

  // modal thing
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };


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


  const handleSubmit = (e) => {
    e.preventDefault()

    if (!user?.profileId || !user.businessId || !user?.headcount || !user?.countryId || !user?.stateId || !user?.cityId) {
      return notify('error', 'Please fill all the details');
    }
    // enterLoading(1)

    apiProvider.createJob(user)
      .then(res => {
        // exitLoading(1)
        if (res.isSuccess) {
          // navigate(`/job/progress/${res.data?._id}`)
          showModal()
          setCreatedJob(res.data)
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
    const [data2, data3] = await Promise.all([

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
    ])

    setBusinessOpt(data2)
    setCountryOpt(data3)
  }


  const getStateOpt = async (country) => {
    apiProvider.getState(`?country=${country}`)
      .then(res => {
        const arr = res.data?.map(i => ({
          label: i?.name,
          value: i?._id
        }))
        setStateOpt(arr)
      })
      .catch(err => (console.log(err)))
  }


  const getCityOpt = async (state) => {
    apiProvider.getCity(`?state=${state}`)
      .then(res => {
        const arr = res.data?.map(i => ({
          label: i?.name,
          value: i?._id
        }))

        setCityOpt(arr)

      })
      .catch(err => (console.log(err)))
  }

  const getProfileOpt = async (band, department) => {
    apiProvider.getProfile(`?band=${band}&departmentId=${department}`)
      .then(res => {
        const arr = res.data?.map(i => ({
          label: i?.title,
          value: i?._id
        }))
        setProfileOpt(arr)
      })
      .catch(err => (console.log(err)))

  }


  const getDepartmentOpt = async (id) => {

  }


  useEffect(() => {
    getProfileOpt()
    getBasicData()
  }, [])



  useEffect(() => {
    if (user?.countryId) {
      getStateOpt(user?.countryId)
    }
  }, [user?.countryId])



  useEffect(() => {
    if (user?.stateId) {
      getCityOpt(user?.stateId)
    }
  }, [user?.stateId])




  const getEmployee = () => {
    return localStorage.getItem(storageConstant.EMPLOYEE) ? JSON.parse(localStorage.getItem(storageConstant.EMPLOYEE)) : null
  }
  const getBand = () => {
    return localStorage.getItem(storageConstant.BAND) ? JSON.parse(localStorage.getItem(storageConstant.BAND)) : null
  }

  const [employee, setEmployee] = useState(getEmployee())
  const [band, setBand] = useState(getBand())
  const [businessId, setBusinessId] = useState(employee?.businessId || null)


  useEffect(() => {
    if (employee?.departmentId || band) {
      setUser(prev => ({ ...prev, "businessId": employee.businessId }))
      getProfileOpt(band, employee?.departmentId)
    }
  }, [employee?.departmentId, band])



  return (
    <div className='flex w-full relative min-h-[80vh]'>
      <Modal title="Basic Modal" open={isModalOpen} footer={null} onCancel={handleCancel}>
        <h6 className='text-center font-semibold text-[20px]'>Job ID : {createdJob?.jobId}</h6>

        <p className='text-center mt-[20px]'>Note: Keep a note of this JOB ID for your future refernece.</p>

        <div className='mt-[30px] justify-center flex gap-3 py-3'>
          <Button title="Close" className="w-[100px] font-semibold" onClick={() => handleCancel()} />
          <Button type='2' title="View Jobs" onClick={() => navigate("/recruitment/view-job")} className="w-[100px] font-semibold" />
        </div>
      </Modal>

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
                  value={businessId}
                  options={businessOpt}
                  onChange={handelChangeSelect}
                  disabled={businessId ? true : false}
                />
              </div>
              <div className='col-span-4'></div>
              <div className="lg:col-span-4 sm:col-span-6 col-span-12">
                <Input
                  label="Headcount"
                  name="headcount"
                  value={user?.headcount}
                  onChange={handleChange}
                  placeholder="Please fill the details"
                />
              </div>
              <div className='col-span-4'></div>

              <div className='col-span-4'></div>

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
            <Button loading={loadings[1]} title="Submit" onClick={(e) => handleSubmit(e)} className=' ' />
            <Button type='2' title="Cancel" className='' />
          </div>

        </Card>

      </div>
    </div>
  )
}

export default Create