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
import { useNavigate } from 'react-router'
import { ROUTES } from '../../routes/RouterConfig'
import * as apiProvider from './../../services/api/jobseeker'

const Register = () => {

    const [flag, setFlag] = useState(0)
    const navigate = useNavigate()
    const [user, setUser] = useState({
        name:'',
        email:'',
        mobile:'',
        workStatus:'',
        resume:'',
        city:'',
        terms:false
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
        await apiProvider.SignUp(user)
        .then(res=>{
            if (res.isSuccess) {
                alert('added success');
            } else {
                  alert('added fail');
                // return notify('error', res.message);
              }
            alert('Registered Successfully')
            console.log(res);
        })
        .catch(err=>{
            alert('Registered failed')
            console.log(err);
        })
    }


    useEffect(() => {
        if(flag==1){
            console.log(flag)
            setUser(prev=>({
                ...prev,
                workStatus:'Experienced',
                city:''
            }))
        }
        else if(flag==2){
            setUser(prev=>({
                ...prev,
                workStatus:'Fresher'
            }))
        }
    }, [flag])


    return (
        <div className='p-[30px] mt-10'>
            <div className='text-center text-xl font-semibold'>
                Register and be a part of The Raichand Group
            </div>
            <div className='max-w-[500px]'>
                <Inputfield
                    label={"Full Name"}
                    prefix={<FaUserAlt />}
                    className="max-w-[500px]"
                    placeholder={'How shall we call you ?'}
                    name="name"
                    value={user.name}
                    onChange={handleChange}
                />
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
                    label={"Mobile"}
                    prefix={<MdPhone />}
                    className="max-w-[500px]"
                    placeholder={"Incase we want to connect with you on call"}
                    name="mobile"
                    type={'number'}
                    value={user.mobile}
                    onChange={handleChange}
                />
                <div className='mt-8'>
                    <div className='text-xl '>Tell us your work status</div>
                    <div className='flex gap-3 justify-between mt-3'>
                        <div className={`relative flex bg-white p-3 rounded-tl-[20px] rounded-br-[20px] gap-5 w-[250px] cursor-pointer  ${flag==1 ?'shadow-lg border border-2 border-[#399D29]':'border border-2'}`}  onClick={()=>{setFlag(1)}}>
                            <img src={experience} className="w-[30px] h-[30px] my-auto" alt="" />
                            {
                                flag==1
                                ?
                                <TiTick className='bg-[#399D29] text-white rounded-full absolute -top-1 -right-2'/>
                                :
                                null
                            }
                            <div>
                                <div className='text-base'>Experienced</div>
                                <div className='text-xsm text-[#B4BAC3]'>I have work experience</div>
                            </div>
                        </div>
                        <div className={`relative flex bg-white p-3 rounded-tl-[20px] rounded-br-[20px] gap-5 w-[250px] cursor-pointer  ${flag==2 ?'shadow-lg border border-2 border-[#399D29]':'border border-2'}`}  onClick={()=>{setFlag(2)}}>
                            <img src={fresher} className="w-[30px] h-[30px] my-auto" alt="" />
                            {
                                flag==2
                                ?
                                <TiTick className='bg-[#399D29] text-white rounded-full absolute -top-1 -right-2'/>
                                :
                                null
                            }
                            <div>
                                <div className='text-base'>Fresher</div>
                                <div className='text-xsm text-[#B4BAC3]'>I don’t have any work experience</div>
                            </div>

                        </div>
                    </div>
                </div>
                {
                    flag==2
                    ?
                    <Inputfield
                        label={"Current City"}
                        className="max-w-[500px]"
                        placeholder={"Mention the city you live "}
                    />
                    :
                    null
                }
                <div className="mt-8">
                    <div className='text-xl '>Resume</div>
                    <div className='relative mt-3 border border-2 cursor border-dashed text-[#B4BAC3] text-center p-2'>
                        <div className="flex justify-center">
                            <IoDocumentAttachSharp />
                        </div>
                        <div>
                            Upload or drag and drop
                        </div>
                        <div>
                            PDF(Preferred),DOCX,DOC up to 2Mb
                        </div>
                        <button>
                            <HiUpload />
                        </button>
                    </div>
                </div>
                <div className="mt-8 text-[#B4BAC3]">
                    <Checkbox 
                    checked={user.terms}
                    onChange={(e)=>{setUser(prev=>({
                        ...prev,
                        terms:e.target.checked
                    }))}}
                    >
                        I agree the <strong className='text-[black]'>Terms and Condition</strong> and <strong className='text-[black]'>Privacy Policy</strong>*
                    </Checkbox>
                </div>
                <button 
                className='mt-5 text-center w-full bg-[#F1C40F] text-white p-2 rounded-[10px] font-semibold'
                onClick={handleSubmit}
                >
                    Register Now
                </button>
            </div>
        </div>
    )
}

export default Register