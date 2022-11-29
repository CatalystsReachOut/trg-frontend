import React, { useEffect } from 'react'
import { useState } from 'react'
import Action from '../../../components/Action/Action'
import Button from '../../../components/Button/Button'
import Card from '../../../components/Card/Card'
import Input from '../../../components/Input/Input'
import Table from '../../../components/Table/Table'
import { Sorter } from '../../../helpers/Sorter'
import * as apiProvider from '../../../services/api/recruitment'
import Select from '../../../components/Select/Select'


const JobDescription = ({ notify, loadings }) => {

    const [jobDescription, setJobDescription] = useState({
        name: '',
        code: ''
    })

    const handleChange = (e) => {
        const { name, value } = e.target;
        setJobDescription(prev => ({
            ...prev,
            [name]: value
        }))
    }


    const columns = [
        {
            title: "Profile",
            dataIndex: "profile",
            sorter: {
                compare: Sorter.DEFAULT,
                multiple: 2
            }
        },
        {
            title: "Daily Job",
            dataIndex: "code",
            sorter: {
                compare: Sorter.DEFAULT,
                multiple: 1
            }
        },
        {
            title: "Responsibility",
            dataIndex: "status"
        },
        {
            title: "KPI",
            dataIndex: "kpi"
        },
        {
            title: "Eligibility Criteria",
            dataIndex: "elegibility_criteria"
        },
    ];

    const [data, setData] = useState([]);
    const [profileData, setProfileData] = useState([])

    const getData = () => {
        // enterLoading(2)
        apiProvider.getProfile()
            .then(res => {

                if (res.isSuccess) {
                    setData(res.data)
                    const arr = res.data.map(data => ({
                        value: data._id,
                        label: data.title
                    }))
                    setProfileData(arr)
                }
                // return exitLoading(2)
            })
            .catch(err => {
                console.log(err)
                // return exitLoading(2)
            })
    }

    const handleSubmit = () => {

        // enterLoading(1)
        // return apiProvider.createCountry(country)
        //     .then(res => {
        //         exitLoading(1)
        //         if (res.isSuccess) {
        //             clearData()
        //             getData()
        //             return notify('success', 'added success');
        //         } else {
        //             return notify('error', res.message);
        //         }
        //     })
        //     .catch(err => {
        //         console.log(err)
        //         // exitLoading(1)
        //         return notify('error', err.message);
        //     })
    }

    const clearData = () => {
        jobDescription({
            name: "",
            code: ""
        })
    }

    useEffect(() => {
        getData();
    }, [])


    return (
        <div>
            <Card>
                <div className='font-bold'> Add Job Description </div>
                <div className='grid grid-cols-1 lg:grid-cols-3 sm:grid-cols-2 mt-4'>
                    <div className="col-span-1">
                        <Select
                            label="Profile"
                            options={profileData}
                            name="profileId"
                            value={jobDescription?.profileId}
                        // onChange={handelChangeSelect}
                        >
                        </Select>
                    </div>
                    <div className="col-span-1">
                        <Input
                            label={'Daily Job'}
                            placeHolder={'Enter Country Code'}
                            value={jobDescription?.dailyJob}
                            name={'dailyJob'}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="col-span-1">
                        <Input
                            label={'Responsibilities'}
                            placeHolder={'Enter Responsibility'}
                            value={jobDescription?.responsibility}
                            name={'responsibility'}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="col-span-1">
                        <Input
                            label={'KPI'}
                            placeHolder={'Enter KPI'}
                            value={jobDescription?.kpi}
                            name={'kpi'}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="col-span-1">
                        <Input
                            label={'Eligibility Criteria'}
                            placeHolder={'Enter Eligibility Criteria'}
                            value={jobDescription?.eligibilityCriteria}
                            name={'eligibilityCriteria'}
                            onChange={handleChange}
                        />
                    </div>
                </div>
                <div className="flex justify-end mt-3">
                    <Button
                        title="Add Job Description"
                        className={'min-w-[100px]'}
                        onClick={handleSubmit}
                    />
                </div>
            </Card>

            <Card className={'mt-3'}>
                <div className="font-bold my-3">
                    Job Description
                </div>
                <Table columns={columns} dataSource={data} />
            </Card>
        </div>
    )
}

export default JobDescription