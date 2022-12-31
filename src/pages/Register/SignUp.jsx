import React from 'react'

import Container from './Container'
import Inputfield from '../../components/RegisterInputs/Inputfield';
import Password from '../../components/RegisterInputs/Password';
import SubmitButton from '../../components/RegisterInputs/SubmitButton';

import {FaUserAlt} from 'react-icons/fa'
import { MdEmail } from 'react-icons/md';
import { Link, useNavigate } from 'react-router-dom';
import { ROUTES } from '../../routes/RouterConfig';

const SignUp = () => {

  const navigate = useNavigate()
  return (
    <>
        
        <div className='font-medium text-2xl leading-[2.5rem]'>Sign Up</div>

        <div className='text-Small/Title/Small text-black/50 self-start text-lg'>Already have an account? <Link to="/login" className='text-ternary hover:underline'> Sign in </Link></div>

         <Inputfield 
         prefix={<FaUserAlt/>} 
         placeholder="Enter Full Name" 
         type="text" 
         label="full name"
         className={'mt-5'}
         />

         <Inputfield 
         prefix={<MdEmail/>} 
         placeholder="Enter Email" 
         type="email" 
         label="email"
         className={'mt-5'}
         />

         <Password
         className={'mt-5'}
         />

         <SubmitButton handleEvent={()=>{navigate(ROUTES.Profile.Initial.Root + '/' + ROUTES.Profile.Initial.Registration)}} label="sign up"/>
         


    </>
  )
}

export default SignUp