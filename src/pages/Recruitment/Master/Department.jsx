import React, { useEffect } from 'react'
import { useState } from 'react'
import Action from '../../../components/Action/Action'
import Button from '../../../components/Button/Button'
import Card from '../../../components/Card/Card'
import Input from '../../../components/Input/Input'
import Table from '../../../components/Table/Table'
import { Sorter } from '../../../helpers/Sorter'
import * as apiProvider from '../../../services/api/recruitment'

const Department = ({ notify, enterLoading, exitLoading, loadings }) => {
  const [department, setDepartment] = useState({
    title:"",
    description:""
  })

 
  const handleChange = (e) => {
    const {name, value} = e.target;
    setDepartment(prev=>({
      ...prev,
      [name]:value
    }))
  }

  const columns = [
    {
      title: "Department",
      dataIndex: "title",
      sorter: {
        compare: Sorter.DEFAULT,
        multiple: 3
      }
    },
    {
      title: "Description",
      dataIndex: "description",
      sorter: {
        compare: Sorter.DEFAULT,
        multiple: 3
      }
    },
    {
      title: "Action",
      dataIndex: "status"
    },
  ];

  const [data,setData] = useState([]);
  const [profileData, setProfileData] = useState([])

  const getData = () => {
    enterLoading(2)
    apiProvider.getDepartment()
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
    return apiProvider.createDepartment(department)
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
    setDepartment({
      title:"",
      description:""
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
              placeHolder = {'Enter Department Name'}
              name='title'
              value={department?.title}
              onChange = {handleChange}
              />
            </div>
            <div className="col-span-1">
              <Input
              label={'Description'}
              placeHolder = {'Enter Description'}
              value = {department?.description}
              name='description'
              onChange = {handleChange}
              />
            </div>
          </div>
          <div className="flex justify-end mt-3">
            <Button 
            title="Add Round" 
            className={'min-w-[100px]'}
            onClick={handleSubmit}
            loading={loadings[1]}
            />
          </div>
        </Card>

        <Card className={'mt-3'}>
          <div className="font-bold my-3">
            Department
          </div>
          <Table loading={loadings[2]} columns={columns} dataSource={data}/>
        </Card>
    </div>
  )
}

export default Department