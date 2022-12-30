import { PinInput, PinInputField } from '@chakra-ui/pin-input'
import React from 'react'

const OTPVerification = () => {
    return (
        <div className='mt-10 p-[30px] my-auto font-semibold'>
            <div className='text-2xl'>
                Verify Mobile Number
            </div>
            <div className='text-lg mt-5'>
                Please enter the OTP sent to your Mobile number +9123456789
            </div>
            <div className="flex gap-x-4 mt-10">
                <PinInput >
                    <PinInputField className='pin-field' />
                    <PinInputField className='pin-field' />
                    <PinInputField className='pin-field' />
                    <PinInputField className='pin-field' />
                </PinInput>
            </div>
            <button className='text-[#F5F1ED] bg-[#222222] p-3 px-5 w-[150px] rounded-full mt-10 text-base'>
                Verify
            </button>
        </div>
    )
}

export default OTPVerification