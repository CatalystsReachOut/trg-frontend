import React from 'react'

import { Input } from 'antd';

const Inputfield = ({prefix,type,placeholder,label}) => {
    return (
        <>
            <div className='font-medium text-[1.25rem] leading-[1.5rem] capitalize mt-[2.4rem] mb-[4px]'>{label}</div>

            <Input type={type} placeholder={placeholder} prefix={<div className='text-[1.25rem] mr-[0.75rem]'>{prefix}</div>} size="large" className=" bg-[#f8f8f8]" />
        </>
    )
}

export default Inputfield