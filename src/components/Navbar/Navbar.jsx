import { Menu } from 'antd';
import { MailOutlined, AppstoreOutlined, SettingOutlined } from '@ant-design/icons';
import logo from './../../assets/images/logo/logo.png'

export default function Navbar() {
  return (
    <div className='h-16 bg-[#0E223D] py-2 w-full'>   
      <div className='flex justify-between items-center container px-6'>
        <div>
          <img src={logo} className="w-[50px]" alt="" />
        </div>
        <Menu mode="horizontal" className='bg-transparent flex border-0' defaultSelectedKeys={['mail']}>
        <Menu.Item key="mail" icon={<MailOutlined />} className='border-0 active:border-0 text-[white]'>
          Home
        </Menu.Item>
        <Menu.SubMenu key="SubMenu" className='hover:text-[white] text-[white]' title="Recruitment" icon={<SettingOutlined />}>
          
            <Menu mode='vertical'>
              <Menu.Item>
                Dashboard
              </Menu.Item>
              <Menu.SubMenu title='Master' className='text-[red] focus:text-[red] hover:text-[red] active:text-[red]'>
                <Menu.Item>
                  Bussiness
                </Menu.Item>
                <Menu.Item>
                  City
                </Menu.Item>
                <Menu.Item>
                  State
                </Menu.Item>
                <Menu.Item>
                  Country
                </Menu.Item>
                <Menu.Item>
                  Round
                </Menu.Item>
                <Menu.Item>
                  Interview Round
                </Menu.Item>
                <Menu.Item>
                  Department
                </Menu.Item>
              </Menu.SubMenu>
            </Menu>
        </Menu.SubMenu>
        </Menu>
        <div>

        </div>
      </div>
    </div>
  )
}
