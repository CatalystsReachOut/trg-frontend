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


  const columns = [
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
      title: "Business Logo",
      dataIndex: "logo",
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
    enterLoading(2)
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
        return exitLoading(2)
      })
      .catch(err => {
        console.log(err)
        return exitLoading(2)

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


  const handleEdit = (id) => {

    enterLoading(1)
    return apiProvider.editBusiness(id, business)
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
        <div className='font-bold'> Add Business </div>
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
          <div className="col-span-1">
            <Input
              label={'Summary'}
              placeHolder={'Summary'}
              value={business?.summary}
              name="summary"
              onChange={handleChange}
            />
          </div>
          <div className="col-span-1">
            <TextArea
              label={'Description'}
              placeHolder={'Description'}
              value={business?.description}
              name="description"
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="flex justify-end mt-3">
          <Button
            loading={loadings[1]}
            title="Add Business"
            className={'min-w-[100px]'}
            onClick={handleSubmit}
          />
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