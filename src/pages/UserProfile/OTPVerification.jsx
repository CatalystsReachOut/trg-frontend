import { PinInput, PinInputField } from '@chakra-ui/pin-input'
import React from 'react'
import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import * as apiProvider from './../../services/api/jobseeker'
import * as StorageConstacts from '../../utils/storageConstants'
import { ROUTES } from '../../routes/RouterConfig'

const OTPVerification = () => {

    const location = useLocation()
    const navigate = useNavigate()

    console.log(location.state);

    

    const { email } = location.state

    const [otp, setOtp] = useState({
        otp1: '',
        otp2: '',
        otp3: '',
        otp4: '',
        otp5: '',
        otp6: '',
    })

    const handleVerifyOtp = async() => {
        const allOTP = otp.otp1 + otp.otp2 + otp.otp3 + otp.otp4 + otp.otp5 + otp.otp6
        await apiProvider.VerifyOTP({otp:allOTP, email:email})
        .then(res=>{
            console.log(res);
            localStorage.setItem(StorageConstacts.AUTH, res.data.token)
            navigate(ROUTES.Profile.Initial.Basic)
        })
        .catch(err=>{
            console.log(err);
        }
        )
    }
    return (
        <div className='mt-10 p-[30px] my-auto font-semibold'>
            <div className='text-2xl'>
                Verify Mobile Number
            </div>
            <div className='text-lg mt-5'>
                Please enter the OTP sent to your email <span className='text-secondary'>{email}</span>
            </div>
            <div className="flex gap-x-4 mt-10">
                <PinInput >
                    <PinInputField
                        className='pin-field'
                        onChange={e => setOtp({ ...otp, otp1: e.target.value })}
                        value={otp.otp1}
                    />

                    <PinInputField
                        className='pin-field'
                        onChange={e => setOtp({ ...otp, otp2: e.target.value })}
                        value={otp.otp2}
                    />

                    <PinInputField
                        className='pin-field'
                        onChange={e => setOtp({ ...otp, otp3: e.target.value })}
                        value={otp.otp3}
                    />

                    <PinInputField
                        className='pin-field'
                        onChange={e => setOtp({ ...otp, otp4: e.target.value })}
                        value={otp.otp4}
                    />

                    <PinInputField
                        className='pin-field'
                        onChange={e => setOtp({ ...otp, otp5: e.target.value })}
                        value={otp.otp5}
                    />

                    <PinInputField
                        className='pin-field'
                        onChange={e => setOtp({ ...otp, otp6: e.target.value })}
                        value={otp.otp6}
                    />
                </PinInput>
            </div>
            <button 
            className='text-[#F5F1ED] bg-[#222222] p-3 px-5 w-[150px] rounded-full mt-10 text-base'
            onClick={handleVerifyOtp}
            >
                Verify
            </button>
        </div>
    )
}

export default OTPVerification