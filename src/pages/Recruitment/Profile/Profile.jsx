import React, { useEffect } from 'react'
import { useState } from 'react'
import Action from '../../../components/Action/Action'
import Button from '../../../components/Button/Button'
import Card from '../../../components/Card/Card'
import Input from '../../../components/Input/Input'
import Select from '../../../components/Select/Select'
import Table from '../../../components/Table/Table'
import { Sorter } from '../../../helpers/Sorter'
import * as apiProvider from '../../../services/api/recruitment'

const Profile = ({ notify, enterLoading, exitLoading, loadings }) => {

    const [user, setUser] = useState({
        title: '',
        profileType: '',
        level: '',
        reportProfile: null
    })

    const [loading, setLoading] = useState(false)

    const columns = [
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
            title: "Level",
            dataIndex: "level",
            sorter: {
                compare: Sorter.DEFAULT,
                multiple: 1
            }

        },
        {
            title: "Reports To",
            dataIndex: "reportProfile",
            render: (_, { reportProfile }) => (<> {profileData.find(item => item.value === reportProfile)?.label} </>)
        },
        {
            title: "Action",
            dataIndex: "status"
        },
    ];

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



    const [profileType, setProfileType] = useState([
        { value: 'Business Specific', label: 'Business Specific' },
        { value: 'Country Specific', label: 'Country Specific' }
    ])

    const [profileData, setProfileData] = useState([])



    const [data, setData] = useState([]);


    const getData = () => {
        enterLoading(2)
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
                return exitLoading(2)
            })
            .catch(err => {
                console.log(err)
                return exitLoading(2)

            })
    }

    const handleSubmit = () => {

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


    const handleEdit = (id) => {

        enterLoading(1)
        return apiProvider.editProfile(id, user)
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

    const clearData = () => {
        setUser({
            title: '',
            profileType: '',
            level: '',
            reportProfile: null
        })
    }

    useEffect(() => {
        getData();
    }, [])


    return (
        <div>
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
                        />
                    </div>
                    <div className="col-span-1">
                        <Select
                            label="Profile Type"
                            options={profileType}
                            name="profileType"
                            value={user?.profileType}
                            onChange={handelChangeSelect}
                        >
                        </Select>
                    </div>
                    <div className="col-span-1">
                        <Input
                            label={'Level'}
                            placeHolder={'Enter Level Name'}
                            name="level"
                            value={user?.level}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="col-span-1">
                        <Select
                            label="Reports to"
                            options={profileData}
                            name="reportProfile"
                            value={user?.reportProfile}
                            onChange={handelChangeSelect}
                        >
                        </Select>
                    </div>
                </div>

                <div className="flex justify-end mt-3">
                    <Button
                        title="Add Profile"
                        loading={loadings[1]}
                        className={'min-w-[100px]'}
                        type={1}
                        onClick={() => handleSubmit()}
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


