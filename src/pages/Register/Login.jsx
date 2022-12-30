import React, { useEffect } from 'react'
import { useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom';
import * as apiProvider from '../../services/api/recruitment'
import * as commonServices from '../../services/common.js';
import * as storageConstants from "../../utils/storageConstants.js"

// Register page components
import Container from './Container'
import Inputfield from '../../components/RegisterInputs/Inputfield';
import Password from '../../components/RegisterInputs/Password';
import SubmitButton from '../../components/RegisterInputs/SubmitButton';

// react icons
import { MdEmail } from 'react-icons/md'



const Login = ({ notify, enterLoading, exitLoading, loadings }) => {

    const navigate = useNavigate()

    const [email, setEmail] = useState()
    const [password, setPassword] = useState()

    const handleSubmit = (e) => {


        e.preventDefault()
        enterLoading(1)

        apiProvider.loginUser({ email, password })
            .then(res => {
                if (res.isSuccess) {
                    commonServices.storeLocalData(storageConstants.LOCAL, storageConstants.AUTH, res.token);
                    commonServices.storeLocalData(storageConstants.LOCAL, storageConstants.USER_ROLE, res.role);
                    commonServices.storeLocalData(storageConstants.LOCAL, storageConstants.USER_ID, res._id);
                    commonServices.storeLocalData(storageConstants.LOCAL, storageConstants.BAND, res.level);
                    commonServices.storeLocalData(storageConstants.LOCAL, storageConstants.EMPLOYEE, res.employee);

                    navigate("/")
                    exitLoading(1)
                    return notify('success', 'Logged In Successfully');
                } else {
                    exitLoading(1)
                    return notify('warning', res.message);
                }

            })
            .catch(err => {
                console.log(err)
                exitLoading(1)
                return notify('error', 'Some error occured');

            })
    }


    return (
        <>
        <div className='font-medium text-[2rem] leading-[2.5rem]'>Personnel Sign in</div>
                
        <Inputfield 
        prefix={<MdEmail/>} 
        placeholder="Enter Email" 
        type="email" 
        label="email"/>
                
        <Password />

        <Link to="/forgotpassword" className='capitalize font-medium text-ternary leading-[19px] self-end mt-[0.5rem] hover:underline'>forget password ?</Link>

         <SubmitButton label="sign in"/>

        <div className='text-Small/Title/Small text-black/50 self-center'>Looking for a job? 
        <Link to = "/signup" className='text-ternary hover:underline'> Signup </Link>
        </div>
           
        </>
    )
}

export default Login