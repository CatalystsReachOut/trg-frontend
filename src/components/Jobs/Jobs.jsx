import React from 'react'
import { Select } from 'antd';
import Card from '../Card/Card'
import { TbDots } from 'react-icons/tb'
import { DownOutlined } from '@ant-design/icons';
import { Dropdown, Space } from 'antd';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../routes/RouterConfig';


const Jobs = ({ data }) => {

    const handleChange = (value) => {
        console.log(value);
    };

    const options1 = [
        {
            value: 'PENDING',
            label: 'Pending',
        },
        {
            value: 'APPROVED',
            label: 'Approved',
        },
        {
            value: 'DECLINED',
            label: 'Declined',
        },
    ]

    const items = [
        {
            label: <Link className='px-2' to={data?.approver_1?.status=='PENDING'?`${ROUTES.Recruitment.Approval1}/${data?._id}`:data?.approver_2?.status=='PENDING'?`${ROUTES.Recruitment.Approval2}/${data?._id}`:data?.approver_3?.status=='PENDING'?`${ROUTES.Recruitment.Approval3}/${data?._id}`:data?.approver_4?.status=='PENDING'?`${ROUTES.Recruitment.Approval4}/${data?._id}`:`/job/progress/${data?._id}`}>Edit</Link>,
            key: '0',
        },
        {
            label: <Link className='px-2' to={`/job/progress/${data?._id}`}>View</Link>,
            key: '1',
        }
    ]
    return (
        <div className='mt-[20px]'>
            <Card className="px-[2rem] pt-[2rem] pb-[2rem] mb-3">
                <div className='flex items-center justify-between'>
                    <h1 className='text-Medium+/Title/Small '>{data.profileName} <span className='text-Medium+/SubTitle/Small text-fourth ml-[1.375rem] text-center'>{data.businessName}</span></h1>

                    <div className='flex items-center'>
                        <Select className='mr-[2.13rem]'
                            // defaultValue={data?.status}
                            value={data?.status}
                            style={{
                                width: 120,
                            }}
                            onChange={handleChange}
                            options={options1}
                        />

                        <Dropdown
                            menu={{
                                items,
                            }}
                            trigger={['click']}
                        >
                            <a onClick={(e) => e.preventDefault()}>
                                <Space>
                                    <TbDots className='text-[2rem]' />
                                </Space>
                            </a>
                        </Dropdown>

                    </div>
                </div>

                <div className="flex items-center justify-between mt-[1.58rem]">
                    <p className='text-Medium+/SubTitle/Small-Strong'>{data?.numberOfOpenings} <span className='text-Medium+/SubLabel/Small text-fourth'>candidates</span></p>
                    <p className='text-Medium+/Label/Small leading-[1.125rem] text-fourth'>Created {data?.createdAt?.split("T")[0]}</p>
                </div>

            </Card>
        </div>
    )
}

export default Jobs