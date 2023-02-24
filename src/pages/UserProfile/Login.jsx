import React, { useEffect } from 'react'
import { FaUserAlt } from 'react-icons/fa'
import Inputfield from '../../components/RegisterInputs/Inputfield'
import { GrMail } from 'react-icons/gr'
import { MdPhone } from 'react-icons/md'
import experience from '../../assets/images/icons/experience.png'
import fresher from '../../assets/images/icons/fresher.png'
import { HiUpload } from 'react-icons/hi'
import { IoDocumentAttachSharp } from 'react-icons/io5'
import { Checkbox } from 'antd'
import { useState } from 'react'
import {TiTick} from 'react-icons/ti'
import {BiLockAlt} from 'react-icons/bi'
import { useNavigate } from 'react-router'
import { ROUTES } from '../../routes/RouterConfig'
import * as apiProvider from './../../services/api/jobseeker'
import * as storageConstants from './../../utils/storageConstants'

const Login = ({notify}) => {

    const navigate = useNavigate()
    const [user, setUser] = useState({
        email:'',
        password:'',
    })

    const handleChange = (e) => {
        const {name, value} = e.target
        setUser(prev=>({
            ...prev,
            [name]:value
        }))
    }

    const handleSubmit = async(e) => {
        e.preventDefault()
        await apiProvider.login(user)
        .then(res=>{
            if(res.isSuccess){
            console.log(res.token);
            localStorage.setItem(storageConstants.AUTH, res.token)
            localStorage.setItem(storageConstants.USER_ID, res.data._id)
            navigate(ROUTES.JobSeeker.Job)
            }
        })
        .catch(err=>{
            alert('Registered failed')
            console.log(err);
        })
    }


    return (
        <div className='p-[30px] mt-10'>
            <div className='text-center text-xl font-semibold'>
                Login to The Raichand Group
            </div>
            <div className='max-w-[500px]'>
                <Inputfield
                    label={"Email"}
                    prefix={<GrMail />}
                    className="max-w-[500px]"
                    placeholder={"Where we can officially communicate?"}
                    name="email"
                    type={'email'}
                    value={user.email}
                    onChange={handleChange}
                />
                <Inputfield
                    label={"Password"}
                    prefix={<BiLockAlt />}
                    className="max-w-[500px]"
                    placeholder={"Secure Yourself"}
                    name="password"
                    type={'password'}
                    value={user.password}
                    onChange={handleChange}
                />
                <button 
                className='mt-5 text-center w-full bg-[#F1C40F] text-white p-2 rounded-[10px] font-semibold'
                onClick={handleSubmit}
                >
                    Login
                </button>
            </div>
        </div>
    )
}

export default Login