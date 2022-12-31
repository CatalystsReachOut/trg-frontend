import React, { useEffect } from 'react'
import { useState } from 'react'
import Action from '../../../components/Action/Action'
import Button from '../../../components/Button/Button'
import Card from '../../../components/Card/Card'
import Input from '../../../components/Input/Input'
import Table from '../../../components/Table/Table'
import { Sorter } from '../../../helpers/Sorter'
import TextArea from './../../../components/Input/TextArea'
import * as apiProvider from '../../../services/api/recruitment'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

import { Switch, Dropdown } from 'antd';

import { BsThreeDots } from "react-icons/bs"
import { fallBackImage, onImageError } from '../../../services/common'

const Bussiness = ({ notify, enterLoading, exitLoading, loadings }) => {
  const [business, setBusiness] = useState({
    name: "",
    address: "",
    url: "",
    code: "",
    logo: "",
    summary: "",
    description: ""
  })

  const [edit, setEdit] = useState(false)

  const handleMenuClick = (e) => {
    const key = e.key.split("_");

    if (key[0] === "edit") {
      setEdit(true)
      setBusiness(data.find(item => item._id === key[1]))

    } else {  // delete
      // setBusiness(data.find(item => item._id === key[1]))
    }
  };



  const items = [{
    label: 'Edit',
    key: "edit"
  }, {
    label: 'Delete',
    key: "delete"
  }
  ]



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
      title: "Business Logo",
      dataIndex: "logo",
      sorter: {
        compare: Sorter.DEFAULT,
        multiple: 1
      },
      render: (logo) => <img src={logo ?? fallBackImage} alt="logo" width={100} />
    },
    {
      title: "Business Name",
      dataIndex: "name",
      sorter: {
        compare: Sorter.DEFAULT,
        multiple: 2
      }
    },
    {
      title: "Address",
      dataIndex: "address",
      sorter: {
        compare: Sorter.DEFAULT,
        multiple: 1
      }
    },

    {
      title: "Business URL",
      dataIndex: "url",
      sorter: {
        compare: Sorter.DEFAULT,
        multiple: 1
      }
    },
    {
      title: "Business Code",
      dataIndex: "code",
      sorter: {
        compare: Sorter.DEFAULT,
        multiple: 1
      }
    },
    {
      title: "Summary",
      dataIndex: "summary",
      sorter: {
        compare: Sorter.DEFAULT,
        multiple: 1
      }
    },
    {
      title: "Description",
      dataIndex: "description",
      sorter: {
        compare: Sorter.DEFAULT,
        multiple: 1
      }
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
        menu={{ items: [{ label: 'Edit', key: `edit` + "_" + id }, { label: 'Delete', key: "delete" + "_" + id }], onClick: handleMenuClick }}
        trigger={['click']}
      >
        <BsThreeDots />
      </Dropdown>)
    }


  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBusiness(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const [data, setData] = useState([]);
  const [profileData, setProfileData] = useState([])


  const getData = () => {
    // enterLoading(2)
    apiProvider.getBusiness()
      .then(res => {

        if (res.isSuccess) {
          setData(res.data)
          const arr = res.data.map(data => ({
            value: data._id,
            label: data.businessName
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
    return apiProvider.createBusiness(business)
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
    return apiProvider.editBusiness(business?._id, business)
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
    setBusiness({
      name: "",
      address: "",
      url: "",
      code: "",
      logo: "",
      summary: "",
      description: ""
    })
  }

  useEffect(() => {
    getData();
  }, [])

  return (
    <div>
      <Card>
        <div className='font-bold'>Add Business </div>
        <div className='grid grid-cols-1 lg:grid-cols-3 sm:grid-cols-2 mt-4'>
          <div className="col-span-1">
            <Input
              label={'Name'}
              placeHolder={'Enter Business Name'}
              value={business?.name}
              name="name"
              onChange={handleChange}
            />
          </div>
          <div className="col-span-1">
            <Input
              label={'Address'}
              placeHolder={'Enter Address'}
              value={business?.address}
              name="address"
              onChange={handleChange}
            />
          </div>
          <div className="col-span-1">
            <Input
              label={'Bussiness Logo'}
              placeHolder={'Bussiness Logo'}
              type="file"
              value={business?.logo}
              name="logo"
              onChange={handleChange}
            />
          </div>
          <div className="col-span-1">
            <Input
              label={'Bussiness URL'}
              placeHolder={'Bussiness URL'}
              value={business?.url}
              name="url"
              onChange={handleChange}
            />
          </div>
          <div className="col-span-1">
            <Input
              label={'Bussiness Code'}
              placeHolder={'Bussiness Code'}
              value={business?.code}
              name="code"
              onChange={handleChange}
            />
          </div>
          <div className="col-span-3">
            <label htmlFor="" className={`text-base px-2  mb-[10px]`}>Summary</label>

            <ReactQuill className='px-2 min-h-[100px]' label={"summary"} theme="snow" value={business?.summary} onChange={(e) => setBusiness((prev) => ({ ...prev, "summary": e }))} />
          </div>
          <div className="col-span-3">
            <label htmlFor="" className={`text-base px-2  mb-[10px]`}>Description</label>

            <ReactQuill className='px-2 min-h-[100px]' label={"description"} theme="snow" value={business?.description} onChange={(e) => setBusiness((prev) => ({ ...prev, "description": e }))} />

          </div>
        </div>
        <div className="flex justify-end mt-3">
          {
            edit ?
              <Button
                loading={loadings[1]}
                title="Update Business"
                className={'min-w-[100px]'}
                onClick={handleEdit}
              /> : <Button
                loading={loadings[1]}
                title="Add Business"
                className={'min-w-[100px]'}
                onClick={handleSubmit}
              />
          }

        </div>
      </Card>
      <Card className={'mt-3'}>
        <div className="font-bold my-3">
          Bussiness
        </div>
        <Table loading={loadings[2]} columns={columns} dataSource={data} />
      </Card>
    </div>
  )
}

export default Bussiness