import React from 'react'
import {Link} from 'react-router-dom'

import Container from './Container'
import Inputfield from '../../components/RegisterInputs/Inputfield'

import { MdEmail } from 'react-icons/md'
import SubmitButton from '../../components/RegisterInputs/SubmitButton'

const ForgotPassword = () => {
    return (
        
        <>
        <Inputfield 
        prefix={<MdEmail />} 
        placeholder="Enter Email" 
        type="email" 
        label="email" />

        <Link to="/reset-otp">
        <SubmitButton 
        label="Reset Password" 
        style="self-start"/>
        </Link>
        </>
    )
}

export default ForgotPassword