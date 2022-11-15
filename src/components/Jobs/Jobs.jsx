import React from 'react'
import { Select } from 'antd';
import Card from '../Card/Card'
import { TbDots } from 'react-icons/tb'


const Jobs = ({ data }) => {

    const handleChange = (value) => {
        console.log(value);
    };

    return (
        <div className='my-[20px]'>
            <Card className="px-[2rem] pt-[2rem] pb-[5.5rem]">
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
                            options={[
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
                            ]} />

                        <TbDots className='text-[2rem]' />
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