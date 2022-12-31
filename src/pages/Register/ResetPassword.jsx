import React from 'react'

import Container from './Container'
import { Input } from 'antd'

import SubmitButton from '../../components/RegisterInputs/SubmitButton'
import Inputfield from '../../components/RegisterInputs/Inputfield'

const ResetPassword = () => {
    return (
        <>

            <div className='font-medium text-2xl leading-[2.5rem]'>Reset Password</div>

            {/* <div className='font-medium text-[1.25rem] leading-6 mt-[3.75rem] capitalize'>password</div> */}
            <Inputfield 
            label={"Password"}
            />
            
            <div className='font-medium text-lg leading-6 mt-[3.75rem] mb-[0.5rem] capitalize'>Confirm password</div>
            <Input.Password size="large" className='py-[10.5px] px-[1.25rem] bg-[#f8f8f8] outline-none border-none'/>

              <SubmitButton label="submit"/>
        </>
    )
}

export default ResetPassword