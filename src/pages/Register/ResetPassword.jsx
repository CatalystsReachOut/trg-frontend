import React from 'react'

import Container from './Container'
import { Input } from 'antd'

import SubmitButton from '../../components/RegisterInputs/SubmitButton'

const ResetPassword = () => {
    return (
        <>

            <div className='font-medium text-[2rem] leading-[2.5rem]'>Reset Password</div>

            <div className='font-medium text-[1.25rem] leading-6 mt-[3.75rem] mb-[0.5rem] capitalize'>password</div>
            <input type="password" className='bg-[#f8f8f8] py-[10.5px] px-[1.25rem] border-black outline-none' />
            
            <div className='font-medium text-[1.25rem] leading-6 mt-[3.75rem] mb-[0.5rem] capitalize'>Confirm password</div>
            <Input.Password size="large" className='py-[10.5px] px-[1.25rem] bg-[#f8f8f8] outline-none border-none'/>

              <SubmitButton label="submit"/>
        </>
    )
}

export default ResetPassword