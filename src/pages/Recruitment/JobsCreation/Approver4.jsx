import React from 'react'

import BackButton from '../../../components/Button/BackButton'
import Select from '../../../components/Select/Select'
import Input from '../../../components/Input/Input'
import Button from '../../../components/Button/Button'
import Card from '../../../components/Card/Card'
import { useState } from 'react'
import Swal from 'sweetalert2'
import TextArea from '../../../components/Input/TextArea'
import { useNavigate, useParams } from 'react-router-dom'
import * as apiProvider from './../../../services/api/recruitment'
import { useEffect } from 'react'

const Apprver4 = () => {

  const navigate = useNavigate()

  const { id } = useParams()

  const [user, setUser] = useState({
    profile: '',
    bussiness: '',
    openings: '',
    country: '',
    state: '',
    city: ''
  })



  const [profileOpt, setProfileOpt] = useState([])
  const [bussinessOpt, setBussinessOpt] = useState([])
  const [countryOpt, setCountryOpt] = useState([])
  const [stateOpt, setStateOpt] = useState([])
  const [cityOpt, setCityOpt] = useState([])
  const [workTypeOpt, setWorkTypeOpt] = useState([])
  const [workShiftOpt, setWorkShiftOpt] = useState([])

  const [data, setData] = useState()


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


  const getData = () => {
    apiProvider.getJobById(id)
      .then(res => {
        console.log(res.data.job);
        setData(res.data.job)
        setUser({
          profile: res.data.job.profileId,
          bussiness: res.data.job.businessId,
          openings: res.data.job.numberOfOpenings,
          country: res.data.job.countryId,
          state: res.data.job.stateId,
          city: res.data.job.cityId,
          status: res.data.job.status
        })
      })
      .catch(err => {
        console.log(err);
      })
  }

  const getBasicData = async () => {
    const [data1, data2, data3, data4, data5, data6, data7] = await Promise.all([
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
      ,
      apiProvider.getWorkShift()
        .then(res => {
          const arr = res.data?.map(i => ({
            label: i?.title,
            value: i?._id
          }))
          return arr;
        })
        .catch(err => (console.log(err)))
      ,
      apiProvider.getWorkType()
        .then(res => {
          const arr = res.data?.map(i => ({
            label: i?.title,
            value: i?._id
          }))
          return arr;
        })
        .catch(err => (console.log(err)))
      ,
    ])

    setProfileOpt(data1);
    setBussinessOpt(data2)
    setCountryOpt(data3)
    setStateOpt(data4)
    setCityOpt(data5)
    setWorkShiftOpt(data6)
    setWorkTypeOpt(data7)

  }


  const updateJob = async () => {
    apiProvider.updateJobById(id, user)
      .then(res => {
        console.log(res.data.job);
        setData(res.data.job)
        setUser({
          profile: res.data.job.profileId,
          bussiness: res.data.job.businessId,
          openings: res.data.job.numberOfOpenings,
          country: res.data.job.countryId,
          state: res.data.job.stateId,
          city: res.data.job.cityId,
          status: res.data.job.status
        })
      })
      .catch(err => {
        console.log(err);
      })
  }

  useEffect(() => {
    getData()
    getBasicData()
  }, [])

  return (
    <div className=' h-auto w-full flex'>
      <Card className='min-h-full h-full w-full relative px-6 flex flex-col'>
        <BackButton onClick={() => { navigate(-1) }} />
        <div className=''>
          <h3 className='text-Medium+/Title/Small mt-2'> Create New Job</h3>
          <hr className='my-3 h-3' />
          <div className='form-parent'>
            <div className="form-child">
              <Select
                label="Profile"
                name='profile'
                options={profileOpt}
                defaultValue={user?.profile}
                disabled
                onChange={handelChangeSelect}
              />
            </div>
            <div className="form-child">
              <Select
                label="Bussiness"
                name="bussiness"
                options={bussinessOpt}
                defaultValue={user?.bussiness}
                onChange={handelChangeSelect}
                disabled
              />
            </div>
            <div className="form-child">
              <Input
                label="Number of Openings"
                name="openings"
                value={user?.openings}
                onChange={handleChange}
                disabled
              />
            </div>
            <div className="form-child">
              <Select
                label="Country"
                name="country"
                options={countryOpt}
                defaultValue={user?.country}
                onChange={handelChangeSelect}
                disabled
              />
            </div>
            <div className="form-child">
              <Select
                label="State"
                name="state"
                options={stateOpt}
                defaultValue={user?.state}
                onChange={handelChangeSelect}
                disabled
              />
            </div>
            <div className="form-child">
              <Select
                label="City"
                name="city"
                options={cityOpt}
                defaultValue={user?.city}
                onChange={handelChangeSelect}
                disabled
              />
            </div>
          </div>

          <h6 className='mt-6 mb-3 px-2 font-semibold text-xl'>Reporting Manager </h6>
          <div className="form-parent">
            <div className="form-child">
              <TextArea
                label="Remarks"
                name="eligibility"
                placeHolder="Enter Eligibility Criteria"
                onChange={handleChange}
              />
            </div>
          </div>

          {
            user?.status == ("APPROVER1" || "APPROVER2" || "APPROVER3") ? <>
              <h6 className='mt-6 mb-3 px-2 font-semibold text-xl'>HR Manager</h6>


              <div className='form-parent mt'>
                <div className="form-child">
                  <TextArea
                    label="Eligibility Criteria"
                    name="eligibility"
                    placeHolder="Enter Eligibility Criteria"
                    onChange={handleChange}
                  />
                </div>
                <div className="form-child">
                  <Select
                    label="Work Type"
                    name="work_type"
                    options={workTypeOpt}
                    onChange={handelChangeSelect}
                  />
                </div>
                <div className="form-child">
                  <Select
                    label="Work Shift"
                    name="work_shift"
                    options={workShiftOpt}
                    onChange={handelChangeSelect}
                  />
                </div>
                <div className="form-child">
                  <TextArea
                    label="Remark"
                    name="remark"
                    placeHolder="Enter Remark"
                    onChange={handleChange}
                  />
                </div>
              </div>

              {
                user?.status == ("APPROVER2" || "APPROVER3") ? <>

                  <h6 className='mt-6 mb-3 px-2 font-semibold text-xl'>Country Head</h6>

                  <div className="form-parent">
                    <div className="form-child grid grid-cols-2">
                      <label htmlFor="" className='px-2 col-span-2'>Pay Range</label>
                      <div className='col-span-2 grid grid-cols-2 gap-3 px-2 pt-2'>
                        <div className="col-span-1">
                          <input
                            className='text-sm p-1 px-2 min-w-full border-[2px] h-[40px] rounded-sm focus:outline-[#F1C40F]'
                            type="number"
                            placeholder='From'
                            value={user?.pay_from}
                            name="pay_from"
                            onChange={handleChange}
                          />
                        </div>
                        <div className="col-span-1">
                          <input
                            className='text-sm p-1 px-2 min-w-full border-[2px] h-[40px] rounded-sm focus:outline-[#F1C40F]'
                            type="number"
                            placeholder='To'
                            value={user?.pay_to}
                            name="pay_to"
                            onChange={handleChange}
                          />
                        </div>

                      </div>
                    </div>
                    <div className="form-child">
                      <Select
                        label="Compensation Mode"
                        onChange={handelChangeSelect}
                        name="compensation"
                      />
                    </div>
                  </div>

                  {
                    user?.status == ("APPROVER2" || "APPROVER3") ? <>
                      <h6 className='mt-6 mb-3 px-2 font-semibold text-xl'>HR HEAD</h6>

                      <div className="form-parent mt-4">
                        <div className="form-child">
                          <TextArea
                            label="Remark"
                            name="remark2"
                            placeHolder="Enter Remark"
                            onChange={handleChange}
                            value={user?.remark2}
                          />
                        </div>
                        <div className="form-child">
                          <Input
                            placeHolder="Enter Hierarchy and"
                            onChange={handleChange}
                            label="Hierarachy Band"
                          />
                        </div>
                      </div>
                    </> : null
                  }
                </> : null
              }
            </> : null
          }




        </div>
        {/* <div className="grid grid-cols-2 gap-3 mt-7">
          <div className="sm:col-span-1 col-span-2">
            <div className="max-w-[400px]">
              
            </div>
          </div>
          <div className="sm:col-span-1 col-span-2">

          </div>
        </div> */}
        <div className='mt-[60px] flex gap-3 py-3'>
          <Button title="Approve" className='' onClick={() => updateJob(user?.status)} />
          <Button type='2' title="Reject" className='' />
        </div>

      </Card>

    </div>
  )
}

export default Apprver4