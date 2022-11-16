import { Menu } from 'antd';
import { MailOutlined, AppstoreOutlined, SettingOutlined } from '@ant-design/icons';
import logo from './../../assets/images/logo/logo.png'
import { ROUTES } from '../../routes/RouterConfig';
import { Link, useNavigate } from 'react-router-dom';
import { SlLogout } from 'react-icons/sl';
import {FiChevronDown} from 'react-icons/fi'
import {navbarData} from './nav.js'
import Stat from './Stat';
import Drop from './Drop';


export default function Navbar() {

  const navigate = useNavigate()


  const logout = () => {
    sessionStorage.clear();
    navigate("/login")
  }

  const stat = 's'
  const drop = 'd'

  return (
    <div className='h-16 bg-[#0E223D] py-2 w-full'>
      <div className='flex justify-between items-center container px-6'>
        <div>
          <img src={logo} className="w-[50px]" alt="" />
        </div>
        <Menu mode="horizontal" className='bg-transparent flex items-center w-[100%] justify-center border-0' defaultSelectedKeys={['mail']}>
          {
            navbarData?.map((i,key)=>{
              if(i?.type==stat)
              return <Stat data={i}/>
              if(i?.type==drop)
              return <Drop data={i}/>
            })
          }
          
        </Menu>
        <div>

          <div
            onClick={() => logout()}
            className={'cursor-pointer'}  >
            <SlLogout color='white' />
          </div>

        </div>
      </div>
    </div>
  )
}
