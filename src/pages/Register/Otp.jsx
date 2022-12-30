import React from 'react'
import { Link } from 'react-router-dom';

import Container from './Container'
import Inputfield from '../../components/RegisterInputs/Inputfield';
import SubmitButton from '../../components/RegisterInputs/SubmitButton';

import { MdEmail } from 'react-icons/md';

import { PinInput, PinInputField,Flex} from '@chakra-ui/react'

const Otp = () => {
    return (
        
        <>
        <Inputfield
            prefix={<MdEmail />}
            placeholder="Enter Email"
            type="email"
            label="email" />

        <div className='text-Medium+/Label/Medium-Strong text-ternary'>The OTP has been sent to name@gmailcom</div>

        <div className='leading-[1.5rem] font-medium text-[1.25rem] mt-[3.75rem] mb-[1rem]'>Enter the otp</div>

        <div className="flex gap-x-4">
            <PinInput >
                  <PinInputField className='pin-field'/>
                  <PinInputField className='pin-field' />
                  <PinInputField className='pin-field'/>
                  <PinInputField className='pin-field'/>
                </PinInput>
                </div>

        <div className='text-Medium+/Paragraph/Medium-Strong text-ternary mt-[1.2rem]'>Resend OTP</div>

        <Link to="/resetpassword">
        <SubmitButton label="submit"/>
        </Link>
            </>
    )
}

export default Otp