import React from 'react'

import BackButton from '../../../components/Button/BackButton'
import Select from '../../../components/Select/Select'
import Input from '../../../components/Input/Input'
import Button from '../../../components/Button/Button'
import Card from '../../../components/Card/Card'
import { useState } from 'react'
import Swal from 'sweetalert2'
import TextArea from '../../../components/Input/TextArea'

const Apprver2 = () => {
  
  const [user, setUser] = useState({
    profile:'',
    bussiness:'',
    openings:'',
    country:'',
    state:'',
    city:''
  })

  const handleConfirmation = () => {
    Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#2ecc71',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Approve'
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire(
            'Approved',
            'Job has been Approved.',
            'success'
          )
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

  return (
    <div className=' h-auto w-full flex'>
      <Card className='min-h-full h-full w-full relative px-6 flex flex-col'>
        <BackButton />
        <div className=''>
          <h3 className='text-Medium+/Title/Small mt-2'> Create New Job</h3>
          <hr className='my-3 h-3' />
          <div className='form-parent'>
            <div className="form-child">
              <Select
                label="Profile"
                name='profile'
                onChange={handelChangeSelect}
              />
            </div>
            <div className="form-child">
              <Select
                label="Bussiness"
                name="bussiness"
                onChange={handelChangeSelect}
              />
            </div>
            <div className="form-child">
              <Input
                label="Number of Openings"
                name="openings"
                value={user?.openings}
                onChange={handleChange}
              />
            </div>
            <div className="form-child">
              <Select
                label="Country"
                name="country"
                onChange={handelChangeSelect}
              />
            </div>
            <div className="form-child">
              <Select
                label="State"
                name="state"
                onChange={handelChangeSelect}
              />
            </div>
            <div className="form-child">
              <Select
                label="City"
                name="city"
                onChange={handelChangeSelect}
              />
            </div>
          </div>
          <div className='form-parent mt-6'>
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
              onChange={handelChangeSelect}
              />
            </div>
            <div className="form-child">
              <Select
              label="Work Shift"
              name="work_shift"
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
        </div>
        <div className='mt-auto flex gap-3 py-3'>
          <Button title="Approve" className=' ' onClick={handleConfirmation}/>
          <Button type='2' title="Reject" className='' />
        </div>
        
      </Card>

    </div>
  )
}

export default Apprver2