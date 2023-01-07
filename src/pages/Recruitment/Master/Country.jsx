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
import { Navigate, useNavigate } from 'react-router-dom'
import { ROUTES } from '../../../routes/RouterConfig'
import {getColumnSearchProps} from './../../../helpers/TableSearch'
import { BsThreeDots } from 'react-icons/bs'
import { Dropdown, Switch } from 'antd'

const Country = ({ notify, enterLoading, exitLoading, loadings }) => {

  const [user, setUser] = useState({
    name: '',
    code: ''
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser(prev => ({
      ...prev,
      [name]: value
    }))
  }



  const columns = [
    {
      title: "Country Name",
      dataIndex: "name",
      sorter: {
        compare: Sorter.DEFAULT,
        multiple: 2
      },
      ...getColumnSearchProps('name')
    },
    {
      title: "Country Code",
      dataIndex: "code",
      sorter: {
        compare: Sorter.DEFAULT,
        multiple: 1
      },
      ...getColumnSearchProps('code')
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

  const getData = () => {
    // enterLoading(2)
    apiProvider.getCountry()
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

    enterLoading(1)
    return apiProvider.createCountry(user)
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
    return apiProvider.editCountry(user?._id, user)
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
    return apiProvider.editCountry(id, { status: "DELETED" })
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
      name: "",
      code: ""
    })
  }

  useEffect(() => {
    getData();
  }, [])

  const navigate = useNavigate();

  const changeRoute = (id) => {
    switch (id?.value) {
      case 'state':
        navigate(ROUTES.Recruitment.Master.State);
        break;
      case 'city':
        navigate(ROUTES.Recruitment.Master.City);
        break;

    }
  }

  const selectData = [
    {
      label: 'Country',
      value: 'country'
    },
    {
      label: 'State',
      value: 'state'
    },
    {
      label: 'City',
      value: 'city'
    }
  ]

  return (
    <div>
      <Card className={'mb-[20px]'}>
        <Select
          className="w-[30%]"
          label="Select"
          options={selectData}
          name="Select"
          value={"country"}
          onChange={(e) => changeRoute(e)}
        >
        </Select>

      </Card>
      <Card>
        <div className='font-bold'> Add Country </div>
        <div className='grid grid-cols-1 lg:grid-cols-3 sm:grid-cols-2 mt-4'>
          <div className="col-span-1">
            <Input
              label={'Country'}
              placeHolder={'Enter Country Name'}
              value={user?.name}
              name={'name'}
              onChange={handleChange}
            />
          </div>
          <div className="col-span-1">
            <Input
              label={'Country Code'}
              placeHolder={'Enter Country Code'}
              value={user?.code}
              name={'code'}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="flex justify-end mt-3">
          <Button
            title="Add Country"
            className={'min-w-[100px]'}
            onClick={() => { edit ? handleEdit() : handleSubmit() }}
          />
        </div>
      </Card>

      <Card className={'mt-3'}>
        <div className="font-bold my-3">
          Country
        </div>
        <Table columns={columns} dataSource={data} />
      </Card>
    </div>
  )
}

export default Country