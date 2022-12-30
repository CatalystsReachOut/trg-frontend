import React from 'react'

import { Input } from 'antd'
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';

import { HiLockClosed } from 'react-icons/hi'

const Password = () => {
    return (
        <>
            <div className='font-medium text-[1.25rem] leading-[1.5rem] capitalize mt-[2.4rem] mb-[4px]'>password</div>
            
            <Input.Password size='large'
                placeholder="Enter Password"
                prefix={<HiLockClosed className='text-[1.25rem] mr-[0.75rem]' />}
                className=" bg-[#f8f8f8]"
                iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
            />
        </>
    )
}

export default Password