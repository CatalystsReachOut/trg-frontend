import React, { useEffect } from 'react'
import { useState } from 'react'
import Action from '../../../components/Action/Action'
import Button from '../../../components/Button/Button'
import Card from '../../../components/Card/Card'
import Input from '../../../components/Input/Input'
import Table from '../../../components/Table/Table'
import { Sorter } from '../../../helpers/Sorter'
import * as apiProvider from '../../../services/api/recruitment'
import ReactQuill from 'react-quill';
import { BsThreeDots } from "react-icons/bs"
import { Switch, Dropdown } from 'antd';
import {getColumnSearchProps} from '../../../helpers/TableSearch'


const Department = ({ notify, enterLoading, exitLoading, loadings }) => {

  const [user, setUser] = useState({
    name: "",
    description: ''
  })

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

  const columns = [
    {
      title: "Department Name",
      dataIndex: "name",
      key:'name',
      sorter: {
        compare: Sorter.DEFAULT,
        multiple: 4
      },
      ...getColumnSearchProps('name')
    },
    {
      title: "Description",
      dataIndex: "description",
      render: (summary) => <div className="content max-h-[100px] overflow-y-scroll" dangerouslySetInnerHTML={{ __html: summary }}></div>
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




  const [profileData, setProfileData] = useState([])



  const [data, setData] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser(prev => ({
      ...prev,
      [name]: value
    }))
  }


  const getData = () => {
    // enterLoading(2)
    apiProvider.getDepartment()
      .then(res => {
        console.log(res.data);
        setData(res.data)
        const arr = res.data.map(data => ({
          value: data._id,
          label: data.title
        }))
        setProfileData(arr)
        // return exitLoading(2)
      })
      .catch(err => {
        console.log(err)
        // return exitLoading(2)
      })
  }

  const handleSubmit = () => {

    enterLoading(1)
    return apiProvider.createDepartment(user)
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
    enterLoading(1)
    return apiProvider.editDepartment(user?._id, user)
      .then(res => {
        if (res.isSuccess) {
          clearData()
          getData()
          setEdit(false)
          return notify('success', 'Edit success');
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
    return apiProvider.editDepartment(id, { status: "DELETED" })
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
      name: '',
      description: ''
    })
  }

  useEffect(() => {
    getData();
  }, [])


  return (
    <div>
      <Card>
        <div className='font-bold'> Add Department </div>
        <div className='grid grid-cols-1 lg:grid-cols-3 sm:grid-cols-2 mt-4'>
          <div className="col-span-1">
            <Input
              label={'Department'}
              placeHolder={'Enter Department'}
              name="name"
              value={user?.name}
              onChange={handleChange}
            />
          </div>

          <div className="col-span-3">
            <label htmlFor="" className={`text-base px-2  mb-[10px]`}>Enter Description</label>

            <ReactQuill className='px-2 min-h-[100px]' label={"description"} theme="snow" value={user?.description} onChange={(e) => setUser((prev) => ({ ...prev, "description": e }))} />

          </div>
        </div>
        <div className="flex justify-end mt-3">
          <Button
            title="Add Department"
            className={'min-w-[100px]'}
            onClick={() => { edit ? handleEdit() : handleSubmit() }}
            loading={loadings[1]}
          />
        </div>
      </Card>

      <Card className={'mt-3'}>
        <div className="font-bold my-3">
          Department
        </div>
        <Table loading={loadings[2]} columns={columns} dataSource={data} />
      </Card>
    </div>
  )
}

export default Department