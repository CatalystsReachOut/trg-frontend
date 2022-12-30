import React from 'react'

import Container from './Container'
import Inputfield from '../../components/RegisterInputs/Inputfield';
import Password from '../../components/RegisterInputs/Password';
import SubmitButton from '../../components/RegisterInputs/SubmitButton';

import {FaUserAlt} from 'react-icons/fa'
import { MdEmail } from 'react-icons/md';
import { Link } from 'react-router-dom';

const SignUp = () => {
  return (
    <>
        
        <div className='font-medium text-[2rem] leading-[2.5rem]'>Sign Up</div>

        <div className='text-Small/Title/Small text-black/50 self-start'>Already have an account? <Link to="/login" className='text-ternary hover:underline'> Sign in </Link></div>

         <Inputfield 
         prefix={<FaUserAlt/>} 
         placeholder="Enter Full Name" 
         type="text" 
         label="full name"/>

         <Inputfield 
         prefix={<MdEmail/>} 
         placeholder="Enter Email" 
         type="email" 
         label="email"/>

         <Password/>

         <SubmitButton label="sign up"/>
         


    </>
  )
}

export default SignUp