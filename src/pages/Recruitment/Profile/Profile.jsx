import { Dropdown, Modal, Switch } from 'antd'
import React, { useEffect } from 'react'
import { useState } from 'react'
import { BsThreeDots } from 'react-icons/bs'
import Action from '../../../components/Action/Action'
import Button from '../../../components/Button/Button'
import Card from '../../../components/Card/Card'
import Input from '../../../components/Input/Input'
import Select from '../../../components/Select/Select'
import Table from '../../../components/Table/Table'
import { Sorter } from '../../../helpers/Sorter'
import * as apiProvider from '../../../services/api/recruitment'
import { jobfields } from '../../../reference/jobassigning'

const Profile = ({ notify, enterLoading, exitLoading, loadings }) => {

    const [user, setUser] = useState({
        title: '',
        profileType: '',
        level: '',
        departmentId:'',
        reportProfile: null,
        band:'',
        approvingAuthority: []
    })

    const [newjobfields,setNewjobfields] = useState([])
    useEffect(()=>{
        const arr = []
        for (const iterator of jobfields) {
            arr.push(iterator)
        }
        setNewjobfields(arr)
    },[])

    console.log(newjobfields);

    const [edit, setEdit] = useState(false)

    const handleMenuClick = (e) => {
        const key = e.key.split("_");

        if (key[0] === "edit") {
            setEdit(true)
            setUser(data.find(item => item._id === key[1]))

        } else {  // delete
            handleDelete(key[1], "DELETED")
        }
    };

    const [loading, setLoading] = useState(false)

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
            title: "Title",
            dataIndex: "title"
        },
        {
            title: "Profile Type",
            dataIndex: "profileType",
            sorter: {
                compare: Sorter.DEFAULT,
                multiple: 1
            }
        },
        {
            title: "Band",
            dataIndex: "band",
            sorter: {
                compare: Sorter.DEFAULT,
                multiple: 1
            }

        },
        {
            title: "Reports To",
            dataIndex: "reportProfile",
            render: (_, { reportProfile }) => (<> {profileData.find(item => item.value === reportProfile)?.label || "null"} </>)
        },
        {
            title: "Department",
            dataIndex: "departmentId",
            render: (_, { departmentId }) => (<> {departmentData.find(item => item.value === departmentId)?.label || "null"} </>)
        },
        {
            title: "Status",
            dataIndex: "_id",
            render: (id, d) => (
                <Switch
                    className='bg-[gray]'
                    checked={d?.status == "ACTIVE" ? true : false}
                    onChange={(e) => {
                        if (e) handleDelete(id, "ACTIVE")
                        else handleDelete(id, "INACTIVE")
                    }} />
            )
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

    const bands = [
        {
            value: '1A',
            label: '1A'
        },
        {
            value: '1B',
            label: '1B'
        },
        {
            value: '2',
            label: '2'
        },
        {
            value: '3',
            label: '3'
        },
        {
            value: '4',
            label: '4'
        },
        {
            value: '5',
            label: '5'
        },
        {
            value: '6',
            label: '6'
        },
        {
            value: '7',
            label: '7'
        },
        {
            value: '8',
            label: '8'
        },
    ]

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const handelChangeSelect = (e) => {
        const { name, value } = e;
        console.log(e)
        setUser(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const [reportsarr, setReportsArr] = useState([])

    const [flag, setFlag] = useState(false)

    const [reportSelected, setReportSelected] = useState([])

    const [reporter, setReporter] = useState()

    const [authorities, setAuthorities] = useState([])



    const [profileType, setProfileType] = useState([
        { value: 'Business Specific', label: 'Business Specific' },
        { value: 'Country Specific', label: 'Country Specific' }
    ])

    const [profileData, setProfileData] = useState([])
    const [departmentData, setDepartmentData] = useState([])




    const [data, setData] = useState([]);


    const getData = async () => {
        // enterLoading(2)
        const [data1, data2] = await Promise.all([
            apiProvider.getProfile()
                .then(res => {
                    if (res.isSuccess) {
                        setData(res.data)
                        const arr = res.data.map(data => ({
                            value: data._id,
                            label: data.title
                        }))
                        return arr

                    }
                })
                .catch(err => {
                    console.log(err)
                    return null
                }),

            apiProvider.getDepartment()
                .then(res => {
                    if (res.isSuccess) {
                        const arr = res.data.map(data => ({
                            value: data._id,
                            label: data.name
                        }))
                        return arr
                    }
                })
                .catch(err => {
                    console.log(err)
                    return null
                }),


        ])
        setProfileData(data1)
        setDepartmentData(data2)
    }



    const handleSubmit = () => {
        if(!user?.title || !user?.band || !user?.profileType || !user?.departmentId) return notify('error','Mandatory fields are required')

        enterLoading(1)
        return apiProvider.createProfile(user)
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
        return apiProvider.editProfile(user?._id, user)
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

    const handleDelete = (id, status) => {
        return apiProvider.editProfile(id, { status: status })
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

    const clearData = () => {
        setUser({
            title: '',
            profileType: '',
            level: '',
            reportProfile: '',
            departmentId:'',
            approvingAuthority: []
        })
    }

    const options = [
        { value: 'WORKSHIFT', label: 'Work Shift' },
        { value: 'WORKTYPE', label: 'Work Type' },
        { value: 'WORKSTYLE', label: 'Work Style' },
        { value: 'EVALUATER', label: 'Evaluate Marks' },
        { value: 'REMARK', label: 'Remark' },
    ]




    const [isModalOpen, setIsModalOpen] = useState(false);

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    useEffect(() => {
        getData();
    }, [])


    return (
        <div>
            <Modal width={800} className="interview_round_modal" title="Assign Profiles" open={isModalOpen} onCancel={handleCancel} onOk={handleOk}>
                <div className="grid grid-cols-2 ">
                    <div className="col-span-1 px-2">
                        Designation
                    </div>
                    <div className="col-span-1 px-2">
                        Assigned Tasks
                    </div>
                </div>
                <div className='grid grid-cols-2 '>
                    <div className="col-span-1">
                        <Select
                            label=""
                            options={profileData}
                            name="reportProfile"
                            value={user.reportProfile || ''}
                            disabled={true}
                        >
                        </Select>
                    </div>
                    <div className="col-span-1">
                        <Input
                            label={""}
                            placeHolder="Remark"
                            disabled={true}
                        />
                    </div>
                </div>

                {
                    user?.approvingAuthority?.map((i, key) => (
                        <div className='grid grid-cols-2' key={key}>
                            <div className="col-span-1">
                                <Select
                                    label=""
                                    options={profileData}
                                    name="reportProfile"
                                    value={i?.profile || ""}
                                >
                                </Select>
                            </div>
                            <div className="col-span-1">
                                <Select
                                    label={""}
                                    placeHolder="Authority"
                                    isMulti
                                    options={jobfields}
                                    value={jobfields?.filter(s => i?.tasks?.find(p => p == s?.value)) || ''}
                                // defaultValue={[options[0]]}
                                // onChange={e => {
                                //     console.log(e);
                                //     const arr = []
                                //     for (const i in e) {
                                //         if (e[i]?.value)
                                //             arr.push(e[i].value)
                                //     }
                                //     setReportSelected(arr)
                                // }}

                                />
                            </div>
                        </div>
                    ))
                }

                {
                    user?.approvingAuthority.length<3
                    ?
                    <>
                        <div className='grid grid-cols-2'>
                            <div className="col-span-1">
                                <Select
                                    label=""
                                    options={profileData}
                                    name="reportProfile"
                                    value={reporter || ''}
                                    onChange={(e) => { setReporter(e.value) }}
                                >
                                </Select>
                            </div>
                            <div className="col-span-1">
                                <Select
                                    label={""}
                                    placeHolder="Authority"
                                    isMulti={true}
                                    value={reportSelected || ''}
                                    options={jobfields}
                                    onChange={e => {
                                        console.log(e);
                                        const arr = []
                                        for (const i in e) {
                                            if (e[i]?.value)
                                                arr.push(e[i].value)
                                        }
                                        setReportSelected(arr)
                                    }}
                                // value={reportSelected}

                                />
                            </div>
                        </div>
                        <div className='px-2 flex justify-end'>
                            <Button
                                title="Add"
                                className="mt-3"
                                onClick={() => {
                                    if (!reporter || reportSelected.length == 0) return;
                                    setUser(prev => ({
                                        ...prev,
                                        approvingAuthority: [
                                            ...user?.approvingAuthority,
                                            {
                                                profile: reporter,
                                                tasks: reportSelected
                                            }
                                        ]
                                    }))
                                    setReporter()
                                    setReportSelected([])
                                    setFlag(prev => !prev)
                                }}
                            />
                        </div>
                    </>
                    :
                    null
                }

            </Modal>
            <Card>
                <div className='font-bold'> Add Profile </div>
                <div className='grid grid-cols-1 lg:grid-cols-3 sm:grid-cols-2 mt-4'>

                    <div className="col-span-1">
                        <Input
                            label={'Title'}
                            placeHolder={'Enter Profile title'}
                            name="title"
                            value={user?.title}
                            onChange={handleChange}
                            required={true}
                        />
                    </div>
                    <div className="col-span-1">
                        <Select
                            label="Profile Type"
                            options={profileType}
                            name="profileType"
                            value={user?.profileType || ''}
                            onChange={handelChangeSelect}
                            required={true}
                        >
                        </Select>
                    </div>
                    <div className="col-span-1">
                        <Select
                            label={'Band'}
                            placeHolder={'Enter Band'}
                            options={bands}
                            name="band"
                            value={user?.band || ''}
                            onChange={handelChangeSelect}
                            required={true}
                        />
                    </div>

                    <div className="col-span-1">
                        <Select
                            label="Reports to"
                            options={profileData}
                            name="reportProfile"
                            value={user?.reportProfile || ''}
                            onChange={handelChangeSelect}
                        >
                        </Select>
                    </div>

                    <div className="col-span-1">
                        <Select
                            label="Department"
                            options={departmentData}
                            name="departmentId"
                            value={user?.departmentId || ''}
                            onChange={handelChangeSelect}
                            required={true}
                        >
                        </Select>
                    </div>
                    <div className="col-span-1 flex items-end">
                        <Button
                            title="Assign Profiles"
                            type={1}
                            onClick={() => showModal()}
                        />
                    </div>
                </div>

                <div className="flex justify-end mt-3">
                    <Button
                        title={edit ? "Update" : "Add Profile"}
                        loading={loadings[1]}
                        className={'min-w-[100px]'}
                        type={1}
                        onClick={() => { edit ? handleEdit() : handleSubmit() }}
                    />
                </div>
            </Card>

            <Card className={'mt-4'}>
                <div className="font-bold my-3">
                    City
                </div>
                <Table loading={loadings[2]} columns={columns} dataSource={data} pagination={{ pageSize: 5 }} />
            </Card>
        </div>
    )
}

export default Profile


