import React from 'react'
import { Menu } from 'antd'
import { useNavigate, Link } from 'react-router-dom'
import { ROUTES } from '../../routes/RouterConfig'
import { FiChevronDown } from 'react-icons/fi'

const Drop = ({ data }) => {

    const navigate = useNavigate()

    const stat = 's'
    const drop = 'd'


    return (
        <Menu.SubMenu key="SubMenu" className='flex items-center hover:text-[white] flex items-center text-[white]' title={<div className='flex items-center gap-2 text-white'>{data?.icon} {data?.title} <FiChevronDown /></div>}>
            {
                data?.data?.map((i, key) => {
                    // console.log(i);
                    if (i?.type == stat){
                        return <Menu.Item key={'drop'+key}>
                                    <Link to={i?.route}>
                                        {i?.title}
                                    </Link>
                                </Menu.Item>
                            
                            
                        }
                    if (i?.type == drop)
                        return <Menu.SubMenu title={i?.title}>
                                    {
                                        i?.data?.map((j,key2)=>(
                                            <Menu.Item key={'drop-'+key+key2}>
                                                <Link to={j?.route}>
                                                    {j?.title}
                                                </Link>
                                            </Menu.Item>
                                        ))
                                    }
                                </Menu.SubMenu>
                            

                })
            }
        </Menu.SubMenu>
    )
}

export default Drop