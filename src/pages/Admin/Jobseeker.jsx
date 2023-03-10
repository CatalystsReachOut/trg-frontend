import React, { useEffect } from 'react'
import { useState } from 'react'
import Action from '../../components/Action/Action'
import Button from '../../components/Button/Button'
import Card from '../../components/Card/Card'
import Input from '../../components/Input/Input'
import Table from '../../components/Table/Table'
import { Sorter } from '../../helpers/Sorter'
import * as apiProvider from '../../services/api/recruitment'
import { BsThreeDots } from "react-icons/bs"
import { Switch, Dropdown } from 'antd';
import { useParams } from 'react-router-dom'


const Jobseeker = ({ notify, enterLoading, exitLoading, loadings }) => {

    const [user, setUser] = useState({
        name: ""
    })


    const { jobId } = useParams()

    const [edit, setEdit] = useState(false)

    const handleMenuClick = (e) => {
        const key = e.key.split("_");

        if (key[0] === "edit") {
            setEdit(true)
            setUser(data.find(item => item._id === key[1]))

        } else {  // delete
            // setBusiness(data.find(item => item._id === key[1]))
            handleDelete(key[1], "DELETED")
        }
    };


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
            title: "Full Name",
            dataIndex: "fullName",
            sorter: {
                compare: Sorter.DEFAULT,
                multiple: 4
            }
        },
        {
            title: "Email",
            dataIndex: "email",
            sorter: {
                compare: Sorter.DEFAULT,
                multiple: 4
            }
        },

        {
            title: "Avatar",
            dataIndex: "avatar",
            render: (avatar) => (
                <div><img src={avatar?.secure_url} alt="Profile Image" /></div>
            )
        },
        {
            title: "Resume",
            dataIndex: "resume",
            render: (resume) => (
                <div><a href={resume?.secure_url} alt="Profile Image" >View Resume </a></div>
            )
        },
        // {
        //     title: "Applied Date",
        //     dataIndex: "applyDate",
        //     sorter: {
        //         compare: Sorter.DEFAULT,
        //         multiple: 4
        //     },
        //     render: (date) => (
        //         <div>{date?.split("T")[0]}</div>
        //     )
        // },
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

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const handleEdit = () => {
        // enterLoading(1)
        // return apiProvider.editRound(user?._id, user)
        //   .then(res => {
        //     if (res.isSuccess) {
        //       clearData()
        //       getData()
        //       setEdit(false)
        //       return notify('success', 'added success');
        //     } else {
        //       setEdit(false)
        //       return notify('error', res.message);
        //     }
        //   })
        //   .catch(err => {
        //     console.log(err)

        //     return notify('error', err.message);
        //   })
    }

    const handleDelete = (id, status) => {
        // return apiProvider.editRound(id, { status: status })
        //   .then(res => {
        //     if (res.isSuccess) {
        //       clearData()
        //       getData()
        //       setEdit(false)
        //       return notify('success', 'added success');
        //     } else {
        //       setEdit(false)
        //       return notify('error', res.message);
        //     }
        //   })
        //   .catch(err => {
        //     console.log(err)

        //     return notify('error', err.message);
        //   })
    }


    const getData = () => {
        // enterLoading(2)
        apiProvider.getJobseekers()
            .then(res => {

                if (res.isSuccess) {
                    const arr = res?.data?.map((i, key) => ({
                        ...i,
                    }))
                    setData(arr)
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
        return apiProvider.createRound(user)
            .then(res => {
                // exitLoading(1)
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
                // exitLoading(1)
                return notify('error', err.message);
            })
    }

    const clearData = () => {
        setUser({
            name: '',
        })
    }

    useEffect(() => {
        getData();
    }, [])


    return (
        <div>
            <Card className={'mt-3'}>
                <div className="font-bold my-3">
                    Job Seekers
                </div>
                <Table loading={loadings[2]} columns={columns} dataSource={data} />
            </Card>
        </div>
    )
}

export default Jobseeker