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
import ReactQuill from 'react-quill'
import { BsThreeDots } from 'react-icons/bs'
import { Dropdown, Switch } from 'antd'


const JobDescription = ({ notify, loadings, enterLoading, exitLoading }) => {

    const [user, setUser] = useState({
        profile: '',
        dailyJob: '',
        responsibilities: '',
        kpi: '',
        eligibilityCriteria: '',
    })

    const clearData = () => {
        setUser({
            profile: '',
            dailyJob: '',
            responsibilities: '',
            kpi: '',
            eligibilityCriteria: '',
        })
    }

    const [edit, setEdit] = useState(false)

    const handleMenuClick = (e) => {
        const key = e.key.split("_");

        if (key[0] === "edit") {
            setEdit(true)
            setUser(data.find(item => item._id === key[1]))

        } else {  // delete
            handleDelete(key[1])
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const handelChangeSelect = (e) => {
        const { name, value } = e;
        setUser(prev => ({
            ...prev,
            [name]: value
        }))
    }


    const columns = [
        {
            title: "Sl no.",
            dataIndex: "index",
            sorter: {
              compare: Sorter.DEFAULT,
              multiple: 2
            },
            render: (value, item, index) => index + 1
          },
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
            dataIndex: "dailyJob",
            sorter: {
                compare: Sorter.DEFAULT,
                multiple: 1
            },
            render: (summary) => <div className="content max-h-[100px] overflow-y-auto" dangerouslySetInnerHTML={{ __html: summary }}></div>
        },
        {
            title: "Responsibility",
            dataIndex: "responsibilities",
            sorter: {
                compare: Sorter.DEFAULT,
                multiple: 1
            },
            render: (summary) => <div className="content max-h-[100px] overflow-y-auto" dangerouslySetInnerHTML={{ __html: summary }}></div>
        },
        {
            title: "KPI",
            dataIndex: "kpi",
            sorter: {
                compare: Sorter.DEFAULT,
                multiple: 1
            },
            render: (summary) => <div className="content max-h-[100px] overflow-y-auto" dangerouslySetInnerHTML={{ __html: summary }}></div>
        },
        {
            title: "Eligibility Criteria",
            dataIndex: "eligibilityCriteria",
            sorter: {
                compare: Sorter.DEFAULT,
                multiple: 1
            },
            render: (summary) => <div className="content max-h-[100px] overflow-y-auto" dangerouslySetInnerHTML={{ __html: summary }}></div>
        },
        {
            title: "Status",
            dataIndex: "_id",
            render: (id) => (<Switch className='bg-[gray]' defaultChecked onChange={() => console.log(id)} />)
        },
        {
            title: "Action",
            dataIndex: "_id",
            render: (id) => (<Dropdown
                className='cursor-pointer'
                menu={{ items: [{ label: 'Edit', key: `edit` + "_" + id }, { label: 'Delete', key: "delete" + "_" + id }], onClick: handleMenuClick }}
                trigger={['click']}
            >
                <BsThreeDots />
            </Dropdown>)
        }
    ];

    const [data, setData] = useState([]);
    const [profileData, setProfileData] = useState([])

    const getBasicData = () => {
        // enterLoading(2)
        apiProvider.getProfile()
            .then(res => {

                if (res.isSuccess) {
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

    const getData = () => {
        apiProvider.getJobDescription()
            .then(res => {

                if (res.isSuccess) {
                    setData(res.data)
                }
                // return exitLoading(2)
            })
            .catch(err => {
                console.log(err)
                // return exitLoading(2)
            })
    }

    const handleSubmit = () => {

        enterLoading(1)
        return apiProvider.createJobDescription(user)
            .then(res => {
                exitLoading(1)
                if (res.isSuccess) {
                    clearData()
                    getData()
                    return notify('success', 'added success');
                } else {
                    return notify('error', res.message);
                }
            })
            .catch(err => {
                console.log(err)
                exitLoading(1)
                return notify('error', err.message);
            })
    }

    const handleEdit = () => {
        // enterLoading(1)
        return apiProvider.editJobDescription(user?._id, user)
            .then(res => {
                if (res.isSuccess) {
                    clearData()
                    getData()
                    setEdit(false)
                    return notify('success', 'added success');
                } else {
                    setEdit(false)
                    return notify('error', res.message);
                }
            })
            .catch(err => {
                console.log(err)

                return notify('error', err.message);
            })
    }

    const handleDelete = (id) => {
        return apiProvider.editJobDescription(id, { status: "DELETED" })
            .then(res => {
                if (res.isSuccess) {
                    clearData()
                    getData()
                    setEdit(false)
                    return notify('success', 'added success');
                } else {
                    setEdit(false)
                    return notify('error', res.message);
                }
            })
            .catch(err => {
                console.log(err)

                return notify('error', err.message);
            })
    }



    useEffect(() => {
        getData();
        getBasicData()
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
                            name="profile"
                            value={user?.profile}
                            onChange={(e)=>handelChangeSelect(e)}
                        // onChange={handelChangeSelect}
                        >
                        </Select>
                    </div>
                    <div className="col-span-3 mt-3">
                        <label htmlFor="" className={`text-base px-2  mb-[10px]`}>Daily Job</label>
                        <ReactQuill 
                        className='px-2 min-h-[100px]' 
                        label={"summary"} 
                        theme="snow" 
                        value={user?.dailyJob} 
                        onChange={(e) => setUser((prev) => ({ ...prev, "dailyJob": e }))} 
                        />
                        {/* <Input
                            label={'Daily Job'}
                            placeHolder={'Enter Country Code'}
                            value={user?.dailyJob}
                            name={'dailyJob'}
                            onChange={handleChange}
                        /> */}
                    </div>
                    <div className="col-span-3">
                        <label htmlFor="" className={`text-base px-2  mb-[10px]`}>Responsibilities</label>
                        <ReactQuill 
                        className='px-2 min-h-[100px]' 
                        label={"summary"} 
                        theme="snow" 
                        value={user?.responsibilities} 
                        onChange={(e) => setUser((prev) => ({ ...prev, "responsibilities": e }))} />
                        {/* <Input
                            label={'Responsibilities'}
                            placeHolder={'Enter Responsibility'}
                            value={user?.responsibility}
                            name={'responsibility'}
                            onChange={handleChange}
                        /> */}
                    </div>
                    <div className="col-span-3">
                        <label htmlFor="" className={`text-base px-2  mb-[10px]`}>KPI</label>
                        <ReactQuill 
                        className='px-2 min-h-[100px]' 
                        label={"summary"} 
                        theme="snow" 
                        value={user?.kpi} 
                        onChange={(e) => setUser((prev) => ({ ...prev, "kpi": e }))} 
                        />
                        {/* <Input
                            label={'KPI'}
                            placeHolder={'Enter KPI'}
                            value={user?.kpi}
                            name={'kpi'}
                            onChange={handleChange}
                        /> */}
                    </div>
                    <div className="col-span-3">
                        <label htmlFor="" className={`text-base px-2  mb-[10px]`}>Eligibility Criteria</label>
                        <ReactQuill 
                        className='px-2 min-h-[100px]' 
                        label={"summary"} 
                        theme="snow" 
                        value={user?.eligibilityCriteria} 
                        onChange={(e) => setUser((prev) => ({ ...prev, "eligibilityCriteria": e }))} 
                        />
                        {/* <Input
                            label={'Eligibility Criteria'}
                            placeHolder={'Enter Eligibility Criteria'}
                            value={user?.eligibilityCriteria}
                            name={'eligibilityCriteria'}
                            onChange={handleChange}
                        /> */}
                    </div>
                </div>
                <div className="flex justify-end mt-3">
                    <Button
                        title="Add Job Description"
                        className={'min-w-[100px]'}
                        onClick={() => { edit ? handleEdit() : handleSubmit() }}
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