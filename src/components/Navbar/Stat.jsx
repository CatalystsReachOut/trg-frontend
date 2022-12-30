import React from 'react'
import {Menu} from 'antd'
import { useNavigate } from 'react-router-dom'
import { ROUTES } from '../../routes/RouterConfig'

const Stat = ({data}) => {

    const navigate = useNavigate()

  return (
    <Menu.Item  className='flex items-center border-0 text-[white]'>
        <div className='flex items-center gap-2 text-white' onClick={() => { navigate(data?.route) }}>
           {data?.icon} {data?.title}
        </div>
    </Menu.Item>
  )
}

export default Stat